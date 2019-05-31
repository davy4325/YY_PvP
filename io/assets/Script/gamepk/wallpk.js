let global = require("global")
let socket = require("websocket")
cc.Class({
    extends: cc.Component,

    properties: {
        gameoverAudio:{
            default:null,
            type:cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter: function (other, self) {
        // console.log('开始碰撞');
        cc.audioEngine.play(this.gameoverAudio,false,1)
        global.is_start = false
        global.otheris_start = false
        cc.find("Canvas/gameover").active = true
        //对方赢了
        let sprite2 = cc.find("Canvas/gameover/winplayer").getComponent(cc.Sprite)
        let url2 = global.otheruserInfo.avatar
        global.createImage(sprite2,url2,150,150)
        cc.find("Canvas/gameover/winplayer/name").getComponent(cc.Label).string = global.otheruserInfo.username + ' 赢了';
        //发送游戏结束消息
        this.sendMsgs('对战结束')
       
        
 
     },
     onCollisionStay: function (other, self) {
         //console.log('碰撞中');
     },
     
     onCollisionExit: function (other, self) {
         //console.log('碰撞结束');
 
     },



     //发送消息
     sendMsgs(content){
         
        var message = {type:'over',uid2:global.otheruserInfo.id,score:global.score,content:content}
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
    },

    start () {

    },

    // update (dt) {},
});
