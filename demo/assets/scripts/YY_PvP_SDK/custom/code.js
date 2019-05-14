const AMFObject = require('../net/AMF/AMFObject');
const AMFArray = require('../net/AMF/AMFArray');

var code = cc.Class({
    statics: {
      read_res: function (data) {    
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();
        ret.res = parseInt(amf_obj.get_value('res'));
        return ret;
      },
      result_res: function (res) {    
        var amf_obj = new AMFObject();
        amf_obj.add(res, 'res');
        return amf_obj.write();
      },
      read_guid_res: function (data) {    
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();
        ret.guid = amf_obj.get_value('guid');
        ret.res = amf_obj.get_value('res');
        return ret;
      },
      result_guid: function (guid) {
        var amf_obj = new AMFObject();
        amf_obj.add(guid, 'guid');
        return amf_obj.write();
      },
      read_local_user_info: function (data) {
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();
        ret.score = parseInt(amf_obj.get_value('score'));
        ret.name = amf_obj.get_value('name');
        return ret;
      },
      result_local_user_info: function (name, score) {
        var amf_obj = new AMFObject();
        amf_obj.add(name, 'name');
        amf_obj.add(score, 'score');
        return amf_obj.write();
      },
      result_guid_type_value_info: function (company_guid, game_type, user_guid, game_value, user_info) {
        var amf_obj = new AMFObject();
        amf_obj.add(game_type, 'game_type');
        amf_obj.add(company_guid, 'company_guid');
        amf_obj.add(user_guid, 'user_guid');
        amf_obj.add(game_value, 'game_value');
        amf_obj.add(user_info, 'user_info');
        return amf_obj.write();
      },
      read_time: function (data) {
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();
        ret.time = parseInt(amf_obj.get_value('time'));
        return ret;
      },
      result_cmd_data: function (cmd, data) {
        var amf_obj = new AMFObject();
        amf_obj.add(cmd, 'cmd');
        amf_obj.add(data, 'data');
        return amf_obj.write();
      },
      read_cmd_data: function (data) {
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();
        ret.cmd = parseInt(amf_obj.get_value('cmd'));
        ret.data = amf_obj.get_value('data');
        return ret;
      },
      read_info_value: function (data) {
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();

        ret.game_value = amf_obj.get_value('game_value');
        ret.user_info = amf_obj.get_value('user_info');

        return ret;
      },
      result_init_plank_array: function (arr_plank, arr_point) {
        var amf_obj = new AMFObject();

        var amf_arr_plank = new AMFArray();

        for (var i = 0; i < arr_plank.length; i++){
          var amf_arr_obj = new AMFObject();

          var val = parseInt(arr_plank[i]);
          amf_arr_obj.add(val, 'r');

          amf_arr_plank.add(amf_arr_obj);   
        }

        amf_obj.add_array(amf_arr_plank, 'arr_plank');

        var amf_arr_point = new AMFArray();
        for (var i = 0; i < arr_point.length; i++){
          var amf_arr_obj = new AMFObject();

          var x = parseInt(arr_point[i].x);
          var y = parseInt(arr_point[i].y);
          amf_arr_obj.add(x, 'x');
          amf_arr_obj.add(y, 'y');

          amf_arr_point.add(amf_arr_obj);   
        }

        amf_obj.add_array(amf_arr_point, 'arr_point');

        return amf_obj.write();
      },
      read_init_plank_array: function (data) {
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();

        ret.arr_plank = [];
        var arr_plank = amf_obj.get_array('arr_plank');

        for (var i = 0; i < arr_plank.childrens.length; i++){
          var amf_arr_obj = arr_plank.childrens[i];

          var rdm = amf_arr_obj.get_value('r');

          ret.arr_plank.push(rdm);
        }

        ret.arr_point = [];
        var arr_point = amf_obj.get_array('arr_point');

        for (var i = 0; i < arr_point.childrens.length; i++){
          var amf_arr_obj = arr_point.childrens[i];

          var x = amf_arr_obj.get_value('x');
          var y = amf_arr_obj.get_value('y');

          var pt = cc.v2(x, y);

          ret.arr_point.push(pt);
        }

        return ret;
      },
    }
});