module.exports={
    domain:'https://www.designs.top/kedou/',
    userInfo:null,
    otheruserInfo:{},
    is_login:0,   //用户是否登录


      /*
      *game参数
    */

    dir:cc.v2(0,50),   //player的初始方向
    speed:4,           //移动速度
    maxlenth:50,       //最大移动距离
    score:0, //得分
    randomRange:cc.v2(300,460), //预置体屏幕上出现的范围
    spawnCount:0,      //预置资源数
    spawnInterval:1,   //预置体生成时间间隔
    numberToSpawn:10,  //显示的最大预置资源数
    is_start:false,  //游戏是否开始

     zIndex:0,//食物节点索引
     /*
      *gamepk  other参数配置
    */
     otherscore:0, //得分
     otherdir:cc.v2(0,50),   //otherplayer的初始方向
     otheris_start:false,  //游戏是否开始
     
    /*
    *用户分享功能
    */
   share: function (title, imageUrl, query = "") {
    console.log("开始分享");
    wx.shareAppMessage({
        title: title,
        imageUrl: imageUrl,
        query: query,
    })
},
     //生成一张图片
     createImage: function (sprite, url, w, h) {
        let image = wx.createImage();
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            sprite.node.width = w;
            sprite.node.height = h;
        };
        image.src = url;
    },

    //微信登录
    login(){
        let _this = this
        try {
            wx.login({//获取code
                success(res) {
                    if (res.code) {
                        // 发起网络请求
                        wx.request({
                            url: _this.domain + 'user/getWxUserInfo',
                            data: {
                                code: res.code
                            },
                            success(res) {
                                console.log(res);
                                var openid = res.data.data.openid;
                                console.log("openid", openid);
                                if (res.data.data.is_old_user == 1) {
                                    _this.userInfo = res.data.data.userInfo;
                                   //更新主页信息
                                   _this.updateUser()
                                   _this.is_login = 1
                                   console.log('我是老用户');
                                } 
                                else {
                                    //新用户处理
                                    console.log('我是新用户');
                                    const button = wx.createUserInfoButton({
                                        type: 'text',
                                        text: '',
                                        style: {
                                          left: 0,
                                          top: 0,
                                          width: 640,
                                          height: 1136
                                        }
                                      })
                                      button.onTap((res) => {
                                        if (res.userInfo) {
                                            console.log("用户授权:", res)
                                            //此时可进行登录操作
                                            wx.request({
                                                url: _this.domain + 'user/login',
                                                data: {
                                                    username: res.userInfo.nickName,
                                                    avatar: res.userInfo.avatarUrl,
                                                    openid: openid,
                                                    city:res.userInfo.city,
                                                    gender:res.userInfo.gender,
                                                    country:res.userInfo.country,
                                                    province:res.userInfo.province
                                                },
                                                success(res) {
                                                    button.destroy();//销毁登录按钮
                                                    _this.userInfo = res.data.data.userInfo;
                                                    _this.is_login = 1
                                                    //更新主页信息
                                                    _this.updateUser()
                                                }
                                            })
                                            button.destroy();
                                        }else {
                                            console.log("用户拒绝授权:", res);
                                        }
                                      })
                                 }
                            }      
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        } catch (error) {
        }
    },




     //更新主页用户信息
     updateUser(){
        let sprite = cc.find("Canvas/user").getComponent(cc.Sprite)
        let url = this.userInfo.avatar
        this.createImage(sprite,url,80,80)
        cc.find("Canvas/user/name").getComponent(cc.Label).string = this.userInfo.username;
    }
}