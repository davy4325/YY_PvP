var utils = cc.Class({
    statics: {
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
        if(this._guid == undefined
          || this._guid == null
          || this._guid == ""){
          return true;
        }
        return false;
      },
      get_guid: function (){
        if(this.guid_is_empty()){
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
      stringToUint8Array: function (str){
        var arr = [];
        
        for (var i = 0, j = str.length; i < j; ++i) {
          arr.push(str.charCodeAt(i));
        }
       
        var tmpUint8Array = new Uint8Array(arr);
        return tmpUint8Array;
      },
      Uint8ArrayToString: function (fileData){
        var dataString = "";

        for (var i = 0; i < fileData.length; i++) {
          dataString += String.fromCharCode(fileData[i]);
        }
       
        return dataString;
      },
      get_now_sec: function() {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        return timestamp;
      },
      leftPad: function (s, n, c) {
        while (s.length < n) {
          s = c + s;
        }
        return s;
      },
      reverseString: function (s) {
        var r = '', i = 0, n = -s.length;
        while (i > n) {
          r += s.substr(--i, 1);
        }
        return r;
      },
      toHex: function (d, n) {
        var h = d.toString(16).toUpperCase();
        return utils.leftPad(h, 2, '0');
      },
      hex: function (bin, cols) {
        //bin = expandUTF8( bin );
        cols || ( cols = 24 );
        var s = '', line = [];
        var c, d, i = 0;
        while (bin) {
          c = bin.charAt(0);
          d = bin.charCodeAt(0);
          bin = bin.substr(1);
          // print hex
          s += utils.toHex(d, 2) + ' ';
          // add printable to line
          if (d === 9) {
            line.push(' '); // <- tab
          }
          else if (d < 32 || d > 126) {
            line.push('.'); // <- unprintable // well, non-ascii
          }
          else {
            line.push(c); // <- printable
          }
          // wrap at cols, and print plain text
          if (++i === cols) {
            s += ' ' + line.join('') + '\n';
            line = [];
            i = 0;
          }
          else if (i % 8 === 0) {
            s += ' ';
          }
        }
        // pick up remainder
        if (line.length) {
          while (i++ < cols) {
            s += '   ';
          }
          s += ' ' + line.join('') + '\n';
        }
        return s;
      },
      uuid: function(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
     
        if (len) {
          // Compact form
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
          // rfc4122, version 4 form
          var r;
     
          // rfc4122 requires these characters
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
     
          // Fill in random data.  At i==19 set the high bits of clock sequence as
          // per rfc4122, sec. 4.1.5
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random()*16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
     
        return uuid.join('');
      },
      set_server_time: function(time){
        this.sec_server_connected = time;
        this.sec_client_connected = this.get_now_sec();
      },
      get_server_time: function(){
	      return this.sec_server_connected + this.get_now_sec() - this.sec_client_connected;
      },
      date_format: function(time) {
        //var date = new Date(time * 1000 + 8 * 3600 * 1000); // 增加8小时
        var date = new Date(time * 1000); // 增加8小时
        return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      get_local_storage_int: function(key) {
        var val = cc.sys.localStorage.getItem(key);
        if(val == null){
          val = 0;
        }
        return val;
      },
      get_local_storage_str: function(key) {
        var val = cc.sys.localStorage.getItem(key);
        if(val == null){
          val = "";
        }
        return val;
      },
      set_local_storage: function(key, val) {
        cc.sys.localStorage.setItem(key, val);
      },

    }
});