let global = require("global")
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
        cc.find("Canvas/gameover").active = true
       
        
 
     },
     onCollisionStay: function (other, self) {
         //console.log('碰撞中');
     },
     
     onCollisionExit: function (other, self) {
         //console.log('碰撞结束');
 
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
