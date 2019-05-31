let global = require("global")
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //更新PK用户信息
        let sprite = cc.find("Canvas/me").getComponent(cc.Sprite)
        let url = global.userInfo.avatar
        global.createImage(sprite,url,120,120)
        cc.find("Canvas/me/name").getComponent(cc.Label).string = global.userInfo.username;

        let sprite2 = cc.find("Canvas/you").getComponent(cc.Sprite)
        let url2 = global.otheruserInfo.avatar
        global.createImage(sprite2,url2,120,120)
        cc.find("Canvas/you/name").getComponent(cc.Label).string = global.otheruserInfo.username;
    },

    start () {
        this.scheduleOnce(function(){
            cc.director.loadScene('gamepk')
        },2)
    },

    // update (dt) {},
});
