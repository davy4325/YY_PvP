const event_msg_data=require('./event_msg_data');var net_queue=cc['Class']({'properties':{'length':0x0,'front':0x0,'rear':0x0},'ctor':function(){this['arr']=[];},'push':function(_0x352b2a,_0x4bb53b){var _0x27433a=new event_msg_data();_0x27433a['cmd']=_0x352b2a;_0x27433a['data']=_0x4bb53b;this['arr']['push'](_0x27433a);},'pop':function(){if(this['empty']()){return null;}return this['arr']['shift']();},'get_front':function(){if(this['empty']()){return null;}return this['arr'][0x0];},'get_rear':function(){var _0x42738f={'oBSZF':function(_0x108bd6,_0x628f4c){return _0x108bd6-_0x628f4c;}};if(this['empty']()){return null;}return this['arr'][_0x42738f['oBSZF'](arr['length'],0x1)];},'clear':function(){this['arr']=[];},'size':function(){return this['arr']['length'];},'empty':function(){var _0x370ce2={'CNyCF':function(_0x53f7ec,_0xc5b3e6){return _0x53f7ec==_0xc5b3e6;}};return _0x370ce2['CNyCF'](this['arr']['length'],0x0);}});net_queue['_instance']=null;net_queue['instance']=function(){if(!net_queue['_instance']){net_queue['_instance']=new net_queue();}return net_queue['_instance'];};