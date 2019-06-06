const AMFObject = require('../net/AMF/AMFObject');
const AMFArray = require('../net/AMF/AMFArray');

var public_code = cc.Class({
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
      result_guid_type_value_info: function (company_guid, game_type, friend_mode, user_guid, game_value, user_info) {
        var amf_obj = new AMFObject();
        amf_obj.add(game_type, 'game_type');
        amf_obj.add(friend_mode, 'friend_mode');
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
      read_reconnect_info_value: function (data) {
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();

        ret.type = amf_obj.get_value('type');
        ret.game_value = amf_obj.get_value('game_value');
        ret.user_info = amf_obj.get_value('user_info');

        return ret;
      },
      result_info_value: function (game_value, user_info) {
        var amf_obj = new AMFObject();
        amf_obj.add(game_value, 'game_value');
        amf_obj.add(user_info, 'user_info');
        return amf_obj.write();
      },
    }
});