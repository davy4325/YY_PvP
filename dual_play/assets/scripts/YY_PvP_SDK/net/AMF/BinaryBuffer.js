var BinaryBuffer=cc['Class']({'\x70\x72\x6f\x70\x65\x72\x74\x69\x65\x73':{},'\x63\x74\x6f\x72':function(){this['inited']=![];},'\x69\x6e\x69\x74':function(_0xaf0514,_0x4439ab){var _0x5333f3={'\x54\x76\x55':function _0x1bcec1(_0x5dd77a,_0x255e50){return _0x5dd77a||_0x255e50;}};this['inited']=!![];this['bigEndian']=_0x5333f3['TvU'](_0xaf0514,0x0);this['buffer']=[];this['setBuffer'](_0x4439ab);},'\x73\x68\x6f\x77\x5f\x69\x6e\x69\x74\x5f\x65\x72\x72\x6f\x72':function(){cc['log']('error\x3a\x20BinaryBuffer\x20Initialization\x20first\x21\x21\x21');},'\x73\x65\x74\x42\x75\x66\x66\x65\x72':function(_0x276460){var _0x23c2bb={'\x71\x68\x42':function _0x56a76d(_0x232e37,_0x3c8c1f){return _0x232e37-_0x3c8c1f;}};if(!this['inited']){this['show\x5finit\x5ferror']();return;}if(_0x276460){for(var _0x599a91,_0x5cbee4=_0x599a91=_0x276460['length'],_0x1d8e37=this['buffer']=new Array(_0x599a91);_0x5cbee4;_0x1d8e37[_0x23c2bb['qhB'](_0x599a91,_0x5cbee4)]=_0x276460['charCodeAt'](--_0x5cbee4));this['bigEndian']&&_0x1d8e37['reverse']();}},'\x68\x61\x73\x4e\x65\x65\x64\x65\x64\x42\x69\x74\x73':function(_0x4dde87){var _0x4ced19={'\x73\x41\x6b':function _0x4768e4(_0x3c0818,_0x44f6ff){return _0x3c0818>=_0x44f6ff;},'\x4d\x43\x75':function _0x15a984(_0x2e693d,_0x38c6fd){return _0x2e693d>>_0x38c6fd;}};if(!this['inited']){this['show\x5finit\x5ferror']();return;}return _0x4ced19['sAk'](this['buffer']['length'],-_0x4ced19['MCu'](-_0x4dde87,0x3));},'\x63\x68\x65\x63\x6b\x42\x75\x66\x66\x65\x72':function(_0x1260a7){if(!this['inited']){this['show\x5finit\x5ferror']();return;}if(!this['hasNeededBits'](_0x1260a7))throw new Error('checkBuffer\x3a\x3amissing\x20bytes');},'\x72\x65\x61\x64\x42\x69\x74\x73':function(_0x4031d1,_0x14cc84){var _0x11e04c={'\x4f\x49\x6a':function _0x3c0bc9(_0x2b2f79,_0x33f99d){return _0x2b2f79==_0x33f99d;},'\x56\x44\x69':function _0x1f7767(_0x33d16e,_0x190c23){return _0x33d16e&_0x190c23;},'\x72\x74\x4d':function _0x16bdd5(_0x26ca14,_0x2fe3b0){return _0x26ca14+_0x2fe3b0;},'\x48\x7a\x75':function _0x1fcd38(_0x312566,_0x3c34d6){return _0x312566*_0x3c34d6;},'\x51\x47\x4c':function _0x47ee12(_0x1dd8ae,_0x5591bd){return _0x1dd8ae+_0x5591bd;},'\x61\x41\x62':function _0x3fdc86(_0x386d0a,_0x571b7a){return _0x386d0a+_0x571b7a;},'\x78\x55\x76':function _0xba1a52(_0x3318ab,_0x599c90){return _0x3318ab*_0x599c90;},'\x47\x4f\x56':function _0x2f8482(_0x3e1177,_0xef590b){return _0x3e1177-_0xef590b;},'\x79\x6b\x78':function _0x51830b(_0x37a864,_0x3636ad){return _0x37a864<_0x3636ad;},'\x4c\x6e\x6c':function _0x1063e9(_0x59d41b,_0x45cb87){return _0x59d41b<=_0x45cb87;},'\x57\x67\x48':function _0x407cde(_0x2503dc,_0x3de9e9){return _0x2503dc%_0x3de9e9;},'\x5a\x6d\x72':function _0x1e4563(_0x5ef63f,_0x3806b8){return _0x5ef63f>>_0x3806b8;},'\x63\x77\x6d':function _0x3cd28b(_0x24a443,_0x3a8437){return _0x24a443+_0x3a8437;},'\x44\x6c\x4d':function _0x42ad42(_0x54b75b,_0x2c458d){return _0x54b75b+_0x2c458d;},'\x4b\x62\x41':function _0x502808(_0x1f69ee,_0x429d4c){return _0x1f69ee&_0x429d4c;},'\x56\x6a\x76':function _0x5dadc3(_0x5eaf97,_0x58f54f){return _0x5eaf97-_0x58f54f;},'\x57\x4b\x72':function _0x3979f7(_0x2072b5,_0xcc79dc){return _0x2072b5<<_0xcc79dc;},'\x53\x47\x64':function _0xf0bb82(_0x5bb030,_0x3a1269){return _0x5bb030-_0x3a1269;},'\x46\x48\x65':function _0x750550(_0x5662d1,_0x3423c3){return _0x5662d1+_0x3423c3;},'\x55\x6d\x6c':function _0x56a9ee(_0x1e0199,_0x452ce3){return _0x1e0199-_0x452ce3;},'\x4c\x5a\x78':function _0x2e225b(_0x140047,_0x448fe9){return _0x140047-_0x448fe9;},'\x4a\x6b\x72':function _0x497f47(_0x27edbe,_0x1ff72a,_0x3f86c4){return _0x27edbe(_0x1ff72a,_0x3f86c4);},'\x64\x54\x49':function _0x1a54e3(_0x57942d,_0x329bc9){return _0x57942d-_0x329bc9;}};if(!this['inited']){this['show\x5finit\x5ferror']();return;}function _0x45ccb3(_0x5e2934,_0x3092f5){for(++_0x3092f5;--_0x3092f5;_0x5e2934=_0x11e04c['OIj'](_0x11e04c['VDi'](_0x5e2934%=_0x11e04c['rtM'](0x7fffffff,0x1),0x40000000),0x40000000)?_0x11e04c['Hzu'](_0x5e2934,0x2):_0x11e04c['QGL'](_0x11e04c['aAb'](_0x11e04c['xUv'](_0x11e04c['GOV'](_0x5e2934,0x40000000),0x2),0x7fffffff),0x1));return _0x5e2934;}if(_0x11e04c['ykx'](_0x4031d1,0x0)||_0x11e04c['Lnl'](_0x14cc84,0x0))return 0x0;this['checkBuffer'](_0x11e04c['aAb'](_0x4031d1,_0x14cc84));for(var _0x55e53a,_0x3f39fb=_0x11e04c['WgH'](_0x4031d1,0x8),_0x3c49f8=_0x11e04c['GOV'](_0x11e04c['GOV'](this['buffer']['length'],_0x11e04c['Zmr'](_0x4031d1,0x3)),0x1),_0x35cfcd=_0x11e04c['cwm'](this['buffer']['length'],_0x11e04c['Zmr'](-_0x11e04c['cwm'](_0x4031d1,_0x14cc84),0x3)),_0x5a65a8=_0x11e04c['GOV'](_0x3c49f8,_0x35cfcd),_0x5c2f43=_0x11e04c['DlM'](_0x11e04c['KbA'](_0x11e04c['Zmr'](this['buffer'][_0x3c49f8],_0x3f39fb),_0x11e04c['Vjv'](_0x11e04c['WKr'](0x1,_0x5a65a8?_0x11e04c['SGd'](0x8,_0x3f39fb):_0x14cc84),0x1)),_0x5a65a8&&(_0x55e53a=_0x11e04c['WgH'](_0x11e04c['FHe'](_0x4031d1,_0x14cc84),0x8))?_0x11e04c['WKr'](_0x11e04c['KbA'](this['buffer'][_0x35cfcd++],_0x11e04c['Uml'](_0x11e04c['WKr'](0x1,_0x55e53a),0x1)),_0x11e04c['LZx'](_0x11e04c['WKr'](_0x5a65a8--,0x3),_0x3f39fb)):0x0);_0x5a65a8;_0x5c2f43+=_0x11e04c['Jkr'](_0x45ccb3,this['buffer'][_0x35cfcd++],_0x11e04c['dTI'](_0x11e04c['WKr'](_0x5a65a8--,0x3),_0x3f39fb)));return _0x5c2f43;}});