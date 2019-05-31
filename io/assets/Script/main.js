let global = require("global")
let socket = require("websocket")
cc.Class({
    extends: cc.Component,

    properties: {
       user:{
           default:null,
           type:cc.Node
       }
    },
    //匹配成功后回调
    callback(uid,username,avatar){
     console.log('匹配成功后回调')
     global.otheruserInfo.id = uid
     global.otheruserInfo.username = username
     global.otheruserInfo.avatar = avatar
     cc.director.loadScene("pkload")
    },
    // LIFE-CYCLE CALLBACKS:
    //一对就对决
    oneByone(){
           //判断是否登录
       if(global.is_login==1)
       {
      //连接websocket
      socket.oneByone_connect()
      //监听消息
      this.onMessage()
       }
    },
     //监听消息
    onMessage()
    {
        socket.onmessage(global.userInfo,this.callback)
        
    },


    //开始游戏
    togame(){
          //判断是否登录
       if(global.is_login==1)
       {
        cc.director.loadScene("game")
       }
    },
   

    onLoad () {
        //判断是否登录
       if(global.is_login==0)
       {
           global.login()
       }
       else
       {
           global.updateUser()
       }
    },

    start () {

    },

    // update (dt) {},
});
