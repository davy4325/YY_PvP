const utils = require('./utils');

var global = cc.Class({
    properties: {
    },
    ctor: function () {
        this._guid = "";
    },
    get_model:function(){
      if(this.model != null){
        return this.model;
      }
      if(cc.sys.platform === cc.sys.DESKTOP_BROWSER){ 
        this.model = "BROWSER";
        return this.model; 
      }else if(cc.sys.platform === cc.sys.WIN32){ 
        this.model = "WIN32";
        return this.model; 
      }else if(cc.sys.platform !== cc.sys.WECHAT_GAME){ 
        this.model = cc.sys.platform;
        return this.model; 
      }

      var _this = this;
      wx.getSystemInfo({
        success:function(res){
          _this.model = res.model;
          var arr = res.model.split("<");
          if(arr.length > 0){
            _this.model = arr[0];
          }
          return _this.model;
        },
        fail:function(res){
          _this.model = "fail";
          return _this.model;
        },
        complete:function(res){
  
        }
      })
    },
    guid_is_empty(){
      if(this._guid == null
        || this._guid == ""){
        return true;
      }
      return false;
    },
    get_guid: function (){
      if(this._guid == ""){
        this._guid = utils.get_local_storage_str("guid");
      }
      return this._guid;
    },
    save_guid: function (guid){
      if(guid == null
        || guid == ""){
        return;
      }
      utils.set_local_storage("guid", guid);
      this._guid = guid;
    },
    createQuadData(width, height) {
      let data = new Uint8Array(width * height * 4);
      for (let i = 0; i < width; i++) {
          for (let n = 0; n < height; n++) {
              //R
              data[i * width * 4 + n * 4 + 0] = 255;
              //G
              data[i * width * 4 + n * 4 + 1] = 255;
              //B
              data[i * width * 4 + n * 4 + 2] = 255;
              //A
              data[i * width * 4 + n * 4 + 3] = 255;
          }
      }
      return data;
    },
    show_tips: function (tips, dt) {

        let node_bg = new cc.Node('toast_bg');
        node_bg.x = 0;
        node_bg.y = 0;
        node_bg.zIndex = 10000;
        node_bg.parent = cc.find("Canvas");

        let node_lbl = new cc.Node("tips_text");
        node_lbl.color = new cc.Color(255, 0, 0);
        node_lbl.zIndex = 10001;

        let label = node_lbl.addComponent(cc.Label);
        label.fontSize = 32;
        label.string = tips;

        node_bg.addChild(node_lbl);
      
        let node_lbl_size = node_lbl.getContentSize();
        let win_size = cc.view.getVisibleSize();

        if(node_lbl_size.width > win_size.width - 20){
            node_lbl.setScale((win_size.width - 20) / node_lbl_size.width);
        }

        let remove_slef = cc.callFunc(function(target) {
                                        target.removeFromParent();
                                      },
                                      node_bg
                                    );

        node_bg.runAction(cc.sequence(cc.delayTime(0.01),
                                      cc.fadeIn(0.2),
                                      cc.delayTime(dt),
                                      cc.fadeOut(0.2),
                                      remove_slef));

        node_bg.runAction(cc.sequence(cc.hide(),
                                      cc.moveBy(0.01, cc.v2(0, -50)),
                                      cc.show(),
                                      cc.moveBy(0.2, cc.v2(0, 50)),
                                      cc.delayTime(dt),
                                      cc.moveBy(0.2, cc.v2(0, 50)),
                                      remove_slef));
    },
    show_loading: function () {

      let canvas = cc.find("Canvas");
      let node_loading = canvas.getChildByName("_loading");
      if(node_loading != null){
          return;
      }

      let win_size = cc.view.getVisibleSize();

      let node_bg = new cc.Node('_loading');
      node_bg.parent = canvas;
      node_bg.zIndex = 10000;
      node_bg.setContentSize(win_size);
      node_bg.addComponent(cc.BlockInputEvents);

      let node_lbl = new cc.Node("tips_text");
      node_bg.addChild(node_lbl);
      node_lbl.setAnchorPoint(0.5, 0);
      node_lbl.setPosition(0, -win_size.height/2);
      node_lbl.color = new cc.Color(255, 0, 0);

      let label = node_lbl.addComponent(cc.Label);
      label.fontSize = 32;
      label.string = "登录中";
      
      let str = label.string;
      label.string = str + "...";
      
      let call_back = cc.callFunc(function(target, ss) {
                                    if(target.zIndex % 4 == 0){
                                      ss += "...";
                                    }else if(target.zIndex % 4 == 1){
                                      
                                    }else if(target.zIndex % 4 == 2){
                                      ss += ".";
                                    }
                                    else if(target.zIndex % 4 == 3){
                                      ss += "..";
                                    }

                                    var lbl = target.getComponent(cc.Label);
                                    lbl.string = ss;
                                    target.zIndex++;
                                  },
                                  label.node, str
                                );

      label.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.3), call_back)));
    },
    hide_loading: function () {
      let canvas = cc.find("Canvas");
      let node = canvas.getChildByName("_loading");
      if(node != null){
          node.removeFromParent();
      }
    },
});

global._instance = null;
global.instance = function () {
    if(!global._instance){
      global._instance = new global();
    }
    return global._instance;
}