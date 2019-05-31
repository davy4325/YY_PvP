let global = require("global")
let socket = require("websocket")
cc.Class({
    extends: cc.Component,

    properties: {
        eatAudio:{
            default:null,
            type:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:
     //碰撞回调处理

     onCollisionEnter: function (other, self) {
        // console.log('开始碰撞');
        cc.audioEngine.play(this.eatAudio,false,1)
        global.score ++
        let score = cc.find("Canvas/me/score").getComponent(cc.Label)
        score.string = 'score:' + global.score
        //发送数据给对方  当前得分  食物节点索引  对方uid
        this.sendMsgs(global.otheruserInfo.id,global.score,self.node.zIndex,'销毁食物节点')


        //销毁节点
        self.node.destroy()
       
        
 
     },
     onCollisionStay: function (other, self) {
         //console.log('碰撞中');
     },
     
     onCollisionExit: function (other, self) {
         //console.log('碰撞结束');
 
     },

     //发送消息
     sendMsgs(uid,score,index,content){
        var message = {type:'destroy',uid2:uid,score:score,index:index,content:content}
        message = JSON.stringify(message)
        socket.sendMsg(message)
     },

    onLoad () {
        //开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //开启 debug 绘制
        manager.enabledDebugDraw = false;
        //如果还希望显示碰撞组件的包围盒
        manager.enabledDrawBoundingBox = false;
        //初始化食物
        //颜色
        let r = (Math.random() - 0.5) * 2 * 255
        let g = (Math.random() - 0.5) * 2 * 255
        let b = (Math.random() - 0.5) * 2 * 255
        this.node.color = cc.color(r,g,b)
        //动画
        let actionOne = cc.scaleTo(.5,.9)
        let actionTwo = cc.scaleTo(.7,1)
        let seq = cc.sequence(actionOne, actionTwo);
        let repeat = cc.repeatForever(seq);
        this.node.runAction(repeat)
    },

    start () {

    },

    // update (dt) {},
});
