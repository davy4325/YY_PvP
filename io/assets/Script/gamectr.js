let global = require('global')
cc.Class({
    extends: cc.Component,

    properties: {
      
        player:{
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
         this.player.rotation = degree   //  这种单独设置精灵旋转会导致拖尾效果不能旋转  我们把拖尾放在上一级节点  
         //设置的移动方向距离
         global.dir = pos
        
        
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
            let eatfood = cc.instantiate(this.foodPrefab);
            eatfood.parent = cc.find("Canvas/food")
            eatfood.position = this.getRandomPosition();
            global.spawnCount++;
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
        cc.director.loadScene("main")
    },


     //重新开始游戏
     restart(){
       cc.find("Canvas/gameover").active = false
       //初始化玩加位置
       this.player.parent.setPosition(0, 0);
       this.player.rotation = 0
       //player的初始方向
        global.dir = cc.v2(0,50)  
       //初始化得分
       global.score = 0
       let score = cc.find("Canvas/user/score").getComponent(cc.Label)
       score.string = 'score:0'
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

    onLoad () {
        //播放背景音乐
        this.curent = cc.audioEngine.play(this.bgaudio,true,0.8)
        //注册触摸事件
        this.registerEvent()
        //更新用户信息
        let sprite = cc.find("Canvas/user").getComponent(cc.Sprite)
        let url = global.userInfo.avatar
        global.createImage(sprite,url,100,100)
        cc.find("Canvas/user/name").getComponent(cc.Label).string = global.userInfo.username;

        //初始化得分
        global.score = 0
        //player的初始方向
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
