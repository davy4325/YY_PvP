//发送数据给对方  建造一个当前的形象  模拟一下当前的状态    模拟的形象不单独做触发


module.exports={

socketUrl:'wss://www.designs.top/wss',  //websocekt 连接地址
ws:null,                                //连接对象
is_accept:false,                       //是否接受邀请
showPale:null, //显示面板
    //请求连接
    connect(){
        this.ws = new WebSocket(this.socketUrl);
        let _this = this
        this.ws.onopen = function (event) {
            //console.log('WebSocket连接成功')
            //console.log("Send Text WS was opened.");
            _this.ws.send('连接WebSocket成功'); //向服务器发送消息      
        };
        this.ws.onmessage = function (event) {
            console.log("监听接收消息: " + event.data);
        };
        this.ws.onerror = function (event) {
            console.log('WebSocket连接失败')
        };
        this.ws.onclose = function (event) {
            console.log('WebSocket连接关闭')
        };
       

            // if (ws.readyState === WebSocket.OPEN) {
            //     ws.send("Hello WebSocket, I'm a text message.");
            // }
            // else {
            //     console.log("WebSocket instance wasn't ready...");
            // }
    },

    //关闭连接
    closeConnect()
    {
       this.ws.close()
    },
    //一对一自动匹配 没有房间号
    oneByone_connect()
    {
        this.ws = new WebSocket(this.socketUrl);
        let _this = this
        this.ws.onopen = function (event) {
            //console.log('WebSocket连接成功')
            //console.log("Send Text WS was opened.");
            //alert('WebSocket连接成功')
            cc.find("Canvas/showmsg").active = true
            _this.showPale = wx.showLoading({
                title: '连接成功',
              })
            //初始化接受邀请
            _this.is_accept = false
                
        };
        this.ws.onerror = function (event) {
            console.log('WebSocket连接失败')
            _this.showPale = wx.showLoading({
                title: '连接失败',
              })
        };
        this.ws.onclose = function (event) {
            console.log('WebSocket连接关闭')
        };
    },


    //监听连接 匹配消息
    onmessage(userInfo,callback)
    {
        let _this = this
        this.ws.onmessage = function (event) {
            let data  = JSON.parse(event.data)
            //let data  = eval('(' + event.data + ')')
            console.log("监听接收消" + data.content+data.type);
            //接收消息类型
            switch(data.type)
            {
                case 'bind': var message = {type:'bind',uid:userInfo.id,username:userInfo.username,avatar:userInfo.avatar,content:'绑定Uid'}
                             message = JSON.stringify(message)
                             _this.sendMsg(message)
                             //console.log('正在匹配玩家中....')
                             _this.showPale =wx.showLoading({
                                title: '正在匹配玩家中......',
                              })
                             break;
                case 'textJoin' : if(userInfo.id==data.uid||_this.is_accept){ 
                                  //加入时 服务器返回uid和自己id相等时 不接受消息
                                    return
                                }
                                else
                                {
                                    //服务器返回uid和自己id相等时 接受消息

                                    //alert(data.content)
                                    _this.showPale =wx.showLoading({
                                        title: data.content,
                                      })
                                    //接受邀请
                                    _this.is_accept = true
                                    //给对方发送确定接受信息，重置对方的is_accept为true
                                    var message = {type:'accept',uid:userInfo.id,username:userInfo.username,avatar:userInfo.avatar,uid2:data.uid,content:'已经接受邀请'}
                                    message = JSON.stringify(message)
                                    _this.sendMsg(message)
                                    //console.log('匹配玩家成功')
                                    _this.showPale =wx.showLoading({
                                        title: '匹配成功',
                                      })

                                      //隐藏提示框
                                      cc.find("Canvas/showmsg").active = false
                                      wx.hideLoading(_this.showPale)
                                    callback(data.uid,data.username,data.avatar)   //返回对方的用户信息
                                }
                                break;
              case 'accept' : if(userInfo.id==data.uid2){          
                                    //alert(data.content)
                                    _this.showPale =wx.showLoading({
                                        title: data.content,
                                      })
                                    _this.is_accept = true
                                    _this.showPale =wx.showLoading({
                                        title: '匹配成功',
                                      })
                                     //隐藏提示框
                                     cc.find("Canvas/showmsg").active = false
                                    wx.hideLoading(_this.showPale)
                                    callback(data.uid,data.username,data.avatar) //返回对方的用户信息

                                }
                                else
                                {
                                   
                                   return
                                }
                                break;
            }
        };
    },
    //发送消息给服务器
    sendMsg(msg){
        this.ws.send(msg)
    },

    //监听动作收的消息
    onMovemessage(id,movecallback,overcallback,poscallback,destroycallback,_t)
    {
        let _this = this
        this.ws.onmessage = function (event) {
            let data  = JSON.parse(event.data)
            //let data  = eval('(' + event.data + ')')
            console.log("监听移动：" + data.content+data.type);
            //接收消息类型
            switch(data.type)
            {
              case 'move' :if(id==data.uid2){          
                                   
                movecallback(data.dir,data.score,data.degree,data.content,_t) //返回对方的用户信息

                                }
                                else
                                {
                                   
                                   return
                                }
                                break;
                case 'over' :overcallback(data.score,data.content,_t) //返回对方的用户信息
                                break;
                case 'position' :poscallback(data.r,data.g,data.b,data.pos,_t) 
                                break;
               case 'destroy' :destroycallback(data.score,data.index,_t) 
                                break;
            }
        };
    },

}