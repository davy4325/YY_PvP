let global = require("global")
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // let id  = Math.floor(Math.random()*1000)
        // global.userInfo.id = id
        // global.userInfo.name = '玩家'+id
    },

    start () {
        console.log('跳转到主场景')
      cc.director.loadScene('main')
    },

    // update (dt) {},
});
