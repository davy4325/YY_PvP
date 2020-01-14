const AMFObject = require('../net/AMF/AMFObject');
const AMFArray = require('../net/AMF/AMFArray');

let public_code = cc.Class({
    statics: {
      read_str: function (data) {    
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();
        ret.str = amf_obj.get_value('str');
        return ret;
      },
      read_res: function (data) {    
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();
        ret.res = parseInt(amf_obj.get_value('res'));
        return ret;
      },
      result_res: function (res) {    
        let amf_obj = new AMFObject();
        amf_obj.add(res, 'res');
        return amf_obj.write();
      },
      read_guid_res: function (data) {    
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();
        ret.guid = amf_obj.get_value('guid');
        ret.res = amf_obj.get_value('res');
        return ret;
      },
      read_guid_points: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();
        ret.guid = amf_obj.get_value('guid');
        ret.points = amf_obj.get_value('points');
        return ret;
      },
      read_guid: function (data) {    
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();
        ret.guid = amf_obj.get_value('guid');
        return ret;
      },
      result_guid: function (guid) {
        let amf_obj = new AMFObject();
        amf_obj.add(guid, 'guid');
        return amf_obj.write();
      },
      result_guid_type_value_info: function (company_guid, game_type, friend_mode, user_guid, game_value, is_internal, user_info) {
        let amf_obj = new AMFObject();
        amf_obj.add(game_type, 'game_type');
        amf_obj.add(friend_mode, 'friend_mode');
        amf_obj.add(company_guid, 'company_guid');
        amf_obj.add(user_guid, 'user_guid');
        amf_obj.add(game_value, 'game_value');
        amf_obj.add(is_internal, 'is_internal');
        amf_obj.add(user_info, 'user_info');
        return amf_obj.write();
      },
      read_time: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();
        ret.time = parseInt(amf_obj.get_value('time'));
        ret.is_reconnect = parseInt(amf_obj.get_value('is_reconnect'));
        return ret;
      },
      result_cmd_data: function (cmd, data) {
        let amf_obj = new AMFObject();
        amf_obj.add(cmd, 'cmd');
        amf_obj.add_amf_code(data, 'data');
        return amf_obj.write();
      },
      read_cmd_data: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read_cmd_data();

        let ret = new Object();
        ret.cmd = parseInt(amf_obj.get_value('cmd'));
        ret.data = amf_obj.get_value('data');
        return ret;
      },
      read_info_value: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.game_value = amf_obj.get_value('game_value');
        ret.user_guid = amf_obj.get_value('user_guid');
        ret.user_info = amf_obj.get_value('user_info');

        return ret;
      },
      read_reconnect_info_value: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.type = amf_obj.get_value('type');
        ret.game_value = amf_obj.get_value('game_value');
        ret.user_info = amf_obj.get_value('user_info');

        return ret;
      },
      result_info_value: function (game_value, user_info) {
        let amf_obj = new AMFObject();
        amf_obj.add(game_value, 'game_value');
        amf_obj.add(user_info, 'user_info');
        return amf_obj.write();
      },
      read_match_infos: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = [];

        let arr = amf_obj.get_array('match_infos');
        for (let i = 0; i < arr.childrens.length; i++){
            let amf_arr_obj = arr.childrens[i];

            let obj = new Object();

            obj.match_id = amf_arr_obj.get_value('match_id');
            obj.ver = amf_arr_obj.get_value('ver');
            obj.fee = amf_arr_obj.get_value('fee');
            obj.str_reward = amf_arr_obj.get_value('reward');
            obj.str_start_time = amf_arr_obj.get_value('start_time');

            obj.reward = JSON. parse(obj.str_reward);
            obj.start_time = JSON. parse(obj.str_start_time);
            
            ret.push(obj);
        }
        return ret;
      },
      result_guid_name_face_mid: function (guid, uid, name, face, mid) {
        let amf_obj = new AMFObject();
        amf_obj.add(guid, 'guid');
        amf_obj.add(uid, 'uid');
        amf_obj.add(name, 'name');
        amf_obj.add(face, 'face');
        amf_obj.add(mid, 'mid');
        return amf_obj.write();
      },
      read_amount_time: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.amount = amf_obj.get_value('amount');
        ret.enroll = amf_obj.get_value('enroll');
        ret.time = amf_obj.get_value('time');

        return ret;
      },
      read_mid_time: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.mid = amf_obj.get_value('mid');
        ret.time = amf_obj.get_value('count');

        return ret;
      },
      read_online_number: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.match = amf_obj.get_value('match');
        ret.battle = amf_obj.get_value('battle');
        ret.single = amf_obj.get_value('single');

        return ret;
      },
      result_res_score_rival: function (res, score, rival_score) {    
        let amf_obj = new AMFObject();

        amf_obj.add(res, 'res');
        amf_obj.add(score, 'score');
        amf_obj.add(rival_score, 'rival_score');
        
        return amf_obj.write();
      },
      read_total_user_rank: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        let arr_rank = [];

        let arr = amf_obj.get_array('rank');
        for (let i = 0; i < arr.childrens.length; i++){
            let amf_arr_obj = arr.childrens[i];

            let obj = new Object();

            obj.type = amf_arr_obj.get_value('type');
            obj.name = amf_arr_obj.get_value('name');
            obj.face = amf_arr_obj.get_value('face');
            obj.rank = amf_arr_obj.get_value('rank');
            obj.score = amf_arr_obj.get_value('score');

            arr_rank.push(obj);
        }

        ret.ranks = arr_rank;
        ret.total = amf_obj.get_value('total');
        ret.remain = amf_obj.get_value('remain');

        let user_rank = amf_obj.get_object('user_rank');

        ret.my_type = user_rank.get_value('type');
        ret.my_rank = user_rank.get_value('rank');
        ret.my_score = user_rank.get_value('score');

        return ret;
      },
      result_match_enroll: function (mid, type) {    
        let amf_obj = new AMFObject();

        amf_obj.add(mid, 'mid');
        amf_obj.add(type, 'type');
        
        return amf_obj.write();
      },
      result_string: function (str) {
        let amf_obj = new AMFObject();

        amf_obj.add(str, 'str');

        return amf_obj.write();
      },
      read_string: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.str = amf_obj.get_value('str');

        return ret;
      },
      read_match_remind: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.mid = amf_obj.get_value('mid');
        ret.sec = amf_obj.get_value('count');

        return ret;
      },
      read_match_champion: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        ret.mid = amf_obj.get_value('mid');
        ret.name = amf_obj.get_value('name');
        ret.face = amf_obj.get_value('face');

        return ret;
      },
      read_match_user_count: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        let arr_match_enroll = [];

        let arr = amf_obj.get_array('match_enroll');
        for (let i = 0; i < arr.childrens.length; i++){
            let amf_arr_obj = arr.childrens[i];

            let obj = new Object();

            obj.mid = amf_arr_obj.get_value('mid');
            obj.count = amf_arr_obj.get_value('count');

            arr_match_enroll.push(obj);
        }

        ret.match_enroll = arr_match_enroll;

        return ret;
      },
      read_join_points_info: function (data) {
        let amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        let ret = new Object();

        let arr_rank = [];

        let arr = amf_obj.get_array('rank');
        if(arr !== null){
            for (let i = 0; i < arr.childrens.length; i++){
              let amf_arr_obj = arr.childrens[i];

              let obj = new Object();

              obj.type = amf_arr_obj.get_value('type');
              obj.name = amf_arr_obj.get_value('name');
              obj.face = amf_arr_obj.get_value('face');
              obj.rank = amf_arr_obj.get_value('rank');
              obj.score = amf_arr_obj.get_value('score');

              arr_rank.push(obj);
            }
        }

        ret.ranks = arr_rank;
        ret.total = amf_obj.get_value('total');
        ret.start_time = amf_obj.get_value('start_time');
        //ret.end_time = amf_obj.get_value('end_time');

        ret.my_points = amf_obj.get_value('my_points');
        ret.my_rank = amf_obj.get_value('my_rank');

        return ret;
      },
    }
});