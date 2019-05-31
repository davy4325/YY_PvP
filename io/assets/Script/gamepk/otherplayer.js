let global = require('global')
cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // LIFE-CYCLE CALLBACKS:
   

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

    update (dt) {
        if(global.otheris_start)
        {
            let  moveAction = cc.moveBy(0.2,cc.v2(global.otherdir.x*global.speed*dt,global.otherdir.y*global.speed*dt))
            this.node.runAction(moveAction)
        }
       
    },
});
