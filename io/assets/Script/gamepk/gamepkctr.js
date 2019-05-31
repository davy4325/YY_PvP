let global = require('global')
let socket = require("websocket")
cc.Class({
    extends: cc.Component,

    properties: {
        meplayer:{
            default:null,
            type:cc.Node
        },
        youplayer:{
            default:null,
            type:cc.Node
        },
      
        bgaudio:{
            default:null,
            type:cc.AudioClip
        },
        foodPrefab:{
            default:null,
            type:cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:
    //触摸事件
    registerEvent() {
        //touchstart 可以换成cc.Node.EventType.TOUCH_START
        this.node.on('touchstart', this.onEventStart, this);
        //touchmove 可以换成cc.Node.EventType.TOUCH_MOVE
        this.node.on('touchmove', this.onEventMove, this);
        //touchcancel 可以换成cc.Node.EventType.TOUCH_CANCEL
        this.node.on('touchcancel', this.onEventCancel, this);
        //touchend 可以换成cc.Node.EventType.TOUCH_END
        this.node.on('touchend', this.onEventEnd, this);
    },
    /**
     * 触摸开始
     */
    onEventStart(event) {
        //世界坐标
        let worldPoint = event.getLocation();
       // console.log('start Event \n worldPoint=', worldPoint);
       //cc.log(worldPoint)
       //将世界坐标转成节点坐标
       let nodePos = this.node.convertToNodeSpaceAR(worldPoint);
       //cc.log(nodePos.x)
       //获取节点宽高
       //let size = this.node.getContentSize();
       //cc.log(size.width)

    },

    /**
     * 触摸移动
     */
    onEventMove(event) {
        //世界坐标
        let  worldPoint = event.getLocation(); 
        //cc.log(worldPoint)
        //实现物体拖动效果
        // var delta = event.touch.getDelta();
        // this.player.x += delta.x;
        // this.player.y += delta.y;

        let pos = this.node.convertToNodeSpaceAR(worldPoint)
         //距离计算
         let len = pos.mag() // 求模
         //计算出新的坐标
         pos.x = pos.x*global.maxlenth / len
         pos.y = pos.y*global.maxlenth / len
         //通过坐标计算弧度  通过弧度计算角度
         let r = Math.atan2(pos.x,pos.y)
         let  degree = r*180/Math.PI
         //console.log(degree)
         //设置精灵的角度
         this.meplayer.rotation = degree   //  这种单独设置精灵旋转会导致拖尾效果不能旋转  我们把拖尾放在上一级节点  
         //设置的移动方向距离
         global.dir = pos

         //发送消息给对方
         this.sendMsgs(pos,degree,global.score,'更新玩家位置和得分情况')
        
        
    },

    /**
     * 触摸
     * 当手指在目标节点区域外离开屏幕时
     * 比如说，触摸node的size是200x200。
     * 当超过这个区域时，就是触发这个事件
     */
    onEventCancel(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        //console.log('cancel Event \n worldPoint=', worldPoint);
        
        
    },

    /**
     * 当手指在目标节点区域内离开屏幕时
     */
    onEventEnd(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        //console.log('end Event \n worldPoint=', worldPoint);


    }, 


     //生成预制资源
     addSpawn(){
        // if (global.spawnCount >= global.numberToSpawn) {
        //     this.clearRepeater();
        //     return;
        // }
        if(!global.is_start)
        {
            this.clearRepeater();  //碰撞检测游戏结束 清除定时器
        }
        if(cc.find("Canvas/food").children.length<=global.numberToSpawn)
        {
            
            //初始化颜色
            //颜色
            let r = (Math.random() - 0.5) * 2 * 255
            let g = (Math.random() - 0.5) * 2 * 255
            let b = (Math.random() - 0.5) * 2 * 255
            let pos = this.getRandomPosition();
            //发送消息
            this.sendMsgPos(r,g,b,pos)
        }
    },

    //生成随机位置
    getRandomPosition(){
        return cc.v2((Math.random() - 0.5) * 2 * global.randomRange.x, (Math.random() - 0.5) * 2 * global.randomRange.y);
    },

     //清楚计时器
    clearRepeater: function() {
        this.unschedule(this.addSpawn);
    },
  

    //返回主界面
    tomain(){

        //这是要做一些处理   断开websocket连接  初始化全局变量的一些数据
        socket.closeConnect()
        global.otheruserInfo = {}
        cc.director.loadScene("main")
    },

    //发送预置体位置数据
    sendMsgPos(r,g,b,pos){
        var message = {type:'position',uid1:global.userInfo.id,uid2:global.otheruserInfo.id,r:r,g:g,b:b,pos:pos}
        message = JSON.stringify(message)
        socket.sendMsg(message)
    },

     //发送消息
     sendMsgs(dir,degree,score,content){
        var message = {type:'move',uid2:global.otheruserInfo.id,dir:dir,score:score,degree:degree,content:content}
        message = JSON.stringify(message)
        socket.sendMsg(message)
    },
  //监听消息回调
  movecallback(dir,score,degree,content,_t){
        console.log(content)
        global.otherdir = dir
        global.otherscore = score
        _t.youplayer.rotation = degree  
        cc.find("Canvas/you/score").getComponent(cc.Label).string = 'score:' + score

       },

       //预置体位置回调
       poscallback(r,g,b,pos,_t){
             let eatfood = cc.instantiate(_t.foodPrefab);
             eatfood.color = cc.color(r,g,b)
             //设置节点的索引
             eatfood.zIndex = global.zIndex++
            eatfood.parent = cc.find("Canvas/food")
            eatfood.position = pos;
            global.spawnCount++;
       },

       //销毁食物节点预置体
       destroycallback(score,index,_t){
        cc.find("Canvas/you/score").getComponent(cc.Label).string = 'score:' + score
        let foods = cc.find("Canvas/food").children
        for(let i = 0;i<foods.length;i++)
        {
            if(foods[i].zIndex==index)
            {
                foods[i].destroy();
                return;
            }
        }
       },
     //游戏结束回调
       overcallback(score,content,_t){
         console.log(content)
         global.is_start = false
         global.otheris_start = false
         global.otherscore = score
         cc.find("Canvas/gameover").active = true
         let sprite = cc.find("Canvas/gameover/winplayer").getComponent(cc.Sprite)
        let url = global.userInfo.avatar
        global.createImage(sprite,url,150,150)
        cc.find("Canvas/gameover/winplayer/name").getComponent(cc.Label).string = global.userInfo.username + ' 赢了';
       },
    //监听消息
    onMessages()
    {
        let _t = this
        socket.onMovemessage(global.userInfo.id,_t.movecallback,_t.overcallback,_t.poscallback,_t.destroycallback,_t)
    },


    onLoad () {
         //监听消息
         this.onMessages()   //页面加载的时候就监听  否则会出现监听错误 调用错误监听函数和回调
        //播放背景音乐
        this.curent = cc.audioEngine.play(this.bgaudio,true,0.8)
        //注册触摸事件
        this.registerEvent()
        //更新用户信息
        //自己
        let sprite = cc.find("Canvas/me").getComponent(cc.Sprite)
        let url = global.userInfo.avatar
        global.createImage(sprite,url,100,100)
        cc.find("Canvas/me/name").getComponent(cc.Label).string = global.userInfo.username;
        cc.find("Canvas/me/score").getComponent(cc.Label).string = 'score:0';

        cc.find("Canvas/meplayer/name").getComponent(cc.Label).string = (global.userInfo.username).substr(0,4);

        //对方
        let sprite2 = cc.find("Canvas/you").getComponent(cc.Sprite)
        let url2 = global.otheruserInfo.avatar
        global.createImage(sprite2,url2,100,100)
        cc.find("Canvas/you/name").getComponent(cc.Label).string = global.otheruserInfo.username;
        cc.find("Canvas/you/score").getComponent(cc.Label).string = 'score:0';
        cc.find("Canvas/youplayer/name").getComponent(cc.Label).string = (global.otheruserInfo.username).substr(0,4);
         //初始化得分
         global.otherscore = 0
         //游戏开始
         global.otheris_start = true
         global.otherdir = cc.v2(0,50)

       //游戏中有变动的数据提重新开始时要初始化
        //初始化食物节点索引
        global.zIndex = 0
        //初始化得分
        global.score = 0
        global.dir = cc.v2(0,50)
         //预制资源出线的位置
         let widthX = cc.winSize.width/2 -50
         let heightY = cc.winSize.height/2 -200
         global.randomRange = cc.v2(widthX,heightY);
         //预制资源出线的个数
         global.spawnCount = 0;
         //游戏开始
         global.is_start = true
        //预制资源开始生成
        this.schedule(this.addSpawn, global.spawnInterval);
    },

    start () {

    },

    // update (dt) {},
    onDestroy(){
        cc.audioEngine.stop(this.curent)
    }
});
