const AMFObject = require('../net/AMF/AMFObject');
const AMFArray = require('../net/AMF/AMFArray');

var private_code = cc.Class({
    statics: {

      result_local_user_info: function (name, score) {
        var amf_obj = new AMFObject();
        amf_obj.add(name, 'name');
        amf_obj.add(score, 'score');
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
      
      result_star_postion: function (arr_point) {
        var amf_obj = new AMFObject();

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
      
      read_star_postion: function (data) {
        var amf_obj = new AMFObject();
        amf_obj.new_deserializer(data);
        amf_obj.read();

        var ret = new Object();

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