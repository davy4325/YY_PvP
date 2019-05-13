var utils = cc.Class({
    statics: {
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