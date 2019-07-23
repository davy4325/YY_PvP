const pvp_connect = require('./YY_PvP_SDK/net/connect');
const pvp_net_queue = require('./YY_PvP_SDK/net/net_queue');
const pvp_utils = require('./YY_PvP_SDK/comm/utils');
const pvp_ask_box = require('./YY_PvP_SDK/comm/ask_box');
const pvp_public_msg = require('./YY_PvP_SDK/comm/public_msg');
const pvp_public_code = require('./YY_PvP_SDK/comm/public_code');
const pvp_private_msg = require('./YY_PvP_SDK/custom/private_msg');
const pvp_private_code = require('./YY_PvP_SDK/custom/private_code');


cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // rival 节点，用于获取对手弹跳的高度，和控制对手行动开关
        rival: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // rival score label 的引用
        rivalScoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 联网对战按钮的引用
        startButton: {
            default: null,
            type: cc.Node
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function () {
        pvp_utils.get_model();
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化计分
        this.score = 0;
        // 初始化对手计分
        this.rivalScore = 0;

        // 在角色组件上暂存 Game 对象的引用
        this.player.getComponent('Player').game = this;
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        //this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.starDuration = Number.MAX_VALUE;
        this.timer = 0;
    },

    createNewStarPostionArray: function (num) {
        //创建随机星星坐标数组
        this.star_point_array = new Array();
        
        //预创建100个，可以在某个临界点增加新坐标
        for(let i = 0; i < num; i++){
            var randX = 0;
            // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
            var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
            // 根据屏幕宽度，随机得到一个星星 x 坐标
            var maxX = this.node.width/2;
            randX = (Math.random() - 0.5) * 2 * maxX;
            // 返回星星坐标
            var pt = cc.v2(randX, randY);
            this.star_point_array.push(pt);
        }
    },

    getNewStarPosition: function () {
        if( this.star_point_index == undefined
            || this.star_point_index >= this.star_point_array.length){
            return cc.v2(0, this.groundY + 150);
        }

        //根据序号产生新的信息坐标
        var pt =  this.star_point_array[this.star_point_index];

        this.star_point_index++;
        
        return pt;
    },

    update: function (dt) {
        this.net_data_callback();
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
            return;
        }
        this.timer += dt;
    },

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        //this.scoreDisplay.string = 'Score: ' + this.score;
        this.scoreDisplay.string = 'Player  Score: ' + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    rivalGainScore: function () {
        this.rivalScore += 1;
        // 更新 RivalScore Label 的文字
        this.rivalScoreDisplay.string = 'Rival  Score: ' + this.rivalScore;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function () {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },

    startPlayer: function(){
        this.player.getComponent('Player').startJump();
        this.player.getComponent('Player').initKeyEvent();

        this.rival.getComponent('Player').startJump();

        this.startButton.active = false;
    },

    onStartButton: function(event){
        pvp_connect.instance().set_disconnected();
        this.connect_to_server();
    },

    connect_to_server: function () {
        pvp_utils.show_loading();
        pvp_connect.instance().connect_to(pvp_public_msg.WAN_url);
        //pvp_connect.instance().connect_to("ws://127.0.0.1:8708");
    },

    net_data_callback: function () {
        var msg_data = pvp_net_queue.instance().pop();
        if(msg_data == null){
           return;
        }

        switch(msg_data.cmd){
            case pvp_public_msg.websocket_on_open:
                this.websocket_on_open();
                break;
            case pvp_public_msg.websocket_on_error:
                this.websocket_on_error();
                break;
            case pvp_public_msg.websocket_on_close:
                this.websocket_on_close();
                break;
            case pvp_public_msg.websocket_on_repeat:
                this.websocket_on_repeat();
                break;
            case pvp_public_msg.websocket_on_prev_close:
                this.websocket_on_prev_close();
                break;
            case pvp_public_msg.public_msg_rival_disconnect:
                this.global_rival_disconnect(msg_data.data);
                break;
            case pvp_public_msg.public_msg_rival_exit:
                this.public_msg_rival_exit(msg_data.data);
                break;
            case pvp_public_msg.public_msg_res_login:
                this.global_res_login(msg_data.data);
                break;
            case pvp_public_msg.public_msg_res_rival:
                this.global_res_game_rival(msg_data.data);
                break;
            case pvp_public_msg.public_msg_reconnect:
                this.global_reconnect(msg_data.data);
                break;
            case pvp_public_msg.public_msg_push_ask:
                this.global_res_game_ask(msg_data.data);
                break;
            case pvp_public_msg.public_msg_res_join:
                this.global_res_join(msg_data.data);
                break;
            case pvp_public_msg.public_msg_res_send_to_all:
                this.public_msg_res_send_to_all(msg_data.data);
                break;
            case pvp_public_msg.public_msg_res_send_to_table:
                this.public_msg_res_send_to_table(msg_data.data);
                break;
            case pvp_public_msg.public_msg_res_send_to_rival:
                this.public_msg_res_send_to_rival(msg_data.data);
                break;
            case pvp_public_msg.public_msg_res_network_test:
                break;
            default:
                break;
        }
    },

    public_msg_res_send_to_all: function(data) {
        var ret = pvp_public_code.read_cmd_data(data);
        switch(ret.cmd){
            default:
                break;
        }  
    },

    public_msg_res_send_to_table: function(data) {
        var ret = pvp_public_code.read_cmd_data(data);
        switch(ret.cmd){
            case pvp_private_msg.local_msg_init_round_data_part:
                this.round_init_part(ret.data);
                break;
            case pvp_private_msg.local_msg_init_round_data_over:
                this.round_init_over(ret.data);
                break;
            default:
                break;
        }  
    },
    
    public_msg_res_send_to_rival: function(data) {
        var ret = pvp_public_code.read_cmd_data(data);
        switch(ret.cmd){
            case pvp_private_msg.local_msg_run_left:
                this.rival_run_left(ret.data);
                break;
            case pvp_private_msg.local_msg_run_right:
                this.rival_run_right(ret.data);
                break;
            case pvp_private_msg.local_msg_run_stop:
                this.rival_run_stop(ret.data);
                break;
            default:
                break;
        }  
    },

    websocket_on_close: function () {
        console.log("网络连接断开!");
        pvp_utils.show_tips("网络连接断开!", 20);
        //this.connect_to_server();
    },

    websocket_on_repeat: function () {
        console.log("无效重连!");
        pvp_utils.hide_loading();
        pvp_utils.show_tips("无效重连!", 2);
    },

    websocket_on_prev_close: function () {
        console.log("前一链接断开!");
        pvp_utils.hide_loading();
        pvp_utils.show_tips("前一链接断开!", 5);
    },

    websocket_on_error: function () {
        pvp_utils.hide_loading();
        pvp_utils.show_tips("无法连接服务器，请稍后再试!", 2);
    },

    websocket_on_open: function () {
        //获取玩家GUID，服务器据此区分不同玩家
        var user_guid = pvp_utils.get_guid();
        if(pvp_utils.guid_is_empty()){
            user_guid = pvp_utils.uuid();
            pvp_utils.save_guid(user_guid);
        }
        console.log("user_guid:" + user_guid);
        //测试使用手机型号作为游戏昵称
        var name = pvp_utils.get_model();

        //自定义需要向对手展示的玩家信息，测试使用游戏昵称和分值
        var user_info_code = pvp_private_code.result_local_user_info(name, 10);

        //玩家在游戏内的主要分值，据此匹配同等水平的玩家
        this.game_value = 999;

        //数据编码（组织GUID、游戏类型、对战模式、玩家GUID、玩家分值、玩家展示信息）
        var obj_code = pvp_public_code.result_guid_type_value_info( pvp_private_msg.company_guid, 
                                                                    pvp_private_msg.game_type, 
                                                                    0,//0：普通对战 1：好友对战，不受他人挑战干扰
                                                                    user_guid, 
                                                                    this.game_value,
                                                                    0,//0: 普通号 1：内部测试号（互相之间不会匹配）
                                                                    user_info_code);
        //发送登录请求
        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_login, obj_code);
    },

    global_rival_disconnect: function (data) {
        pvp_utils.show_tips("对手掉线!", 20);
    },

    public_msg_rival_exit: function (data) {
        pvp_utils.show_tips("对手离开!", 20);
    },

    global_res_login: function (data) {
        pvp_utils.hide_loading();//隐藏loading

        var ret = pvp_public_code.read_time(data);//登录返回数据，正常返回服务器时间

        if(ret.time == 101){
            pvp_utils.show_tips("解码错误!", 2);
            return;
        }else if(ret.time == 102){
            pvp_utils.show_tips("company guid长度错误（只能36位）!", 2);
            return;
        }else if(ret.time == 103){
            pvp_utils.show_tips("game type错误（不能是0）！", 2);
            return;
        }else if(ret.time == 104){
            pvp_utils.show_tips("user guid长度错误（只能36位）!", 2);
            return;
        }else if(ret.time == 105){
            pvp_utils.show_tips("消息数量超限!", 2);
            return;
        }else if(ret.time == 106){
            pvp_utils.show_tips("在线人数超限!", 2);
            return;
        }
        else if(ret.time == 107){
            pvp_utils.show_tips("company guid到期!", 2);
            return;
        }
        else{
            //pvp_utils.show_tips("登录成功，正在匹配对手!", 2);

            pvp_utils.set_server_time(ret.time);//记录服务器时间备用

            this.schedule(this.send_heartbeat, 30);//每隔30秒发送心跳消息

            //请求匹配对手，好友对战
            //let browse = "F6EF07E9-E389-469E-8EC7-FD082BA0C1A1";
            //let win32 = "7E20C673-114F-48D9-A398-438B2F61318F";
            //pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_friend_rival, pvp_public_code.result_guid(browse));
            
            //pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_set_friend_mode, pvp_public_code.result_res(1));
            //pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_rival, pvp_public_code.result_guid(win32));
            //pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_friend_rival, pvp_public_code.result_guid(win32));

            //请求匹配对手，自由对战
            pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_rival, "");
            //pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_network_test, "");
        }
    },
    
    send_heartbeat: function() {
        //发送心跳消息，服务器心跳检测超时后会断开网络连接
        console.log("发送心跳消息");
        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_heartbeat, "");
    },

    global_res_game_rival: function (data) {
        var ret = pvp_public_code.read_res(data);

        //匹配失败将会收到res参数，匹配成功将会收到对手信息
        if(isNaN(ret.res)){
            //匹配成功，解码对手信息
            var ret = pvp_public_code.read_info_value(data);

            //对手分值，可以展示出来
            var game_value = ret.game_value;

            console.log("me:" + pvp_utils.get_guid());
            console.log("rival:" + ret.user_guid);

            //对手信息二进制编码
            var user_info = ret.user_info;

            //解码对手信息
            this.rival_info = pvp_private_code.read_local_user_info(user_info);

            //提示匹配成功，并展示对手信息
            pvp_ask_box.instance().show("已经找到对手‘" + this.rival_info.name + "’,等待对方同意！");
        }
        else{
            pvp_utils.show_tips("正在匹配对手，请稍候!", 2);
        }
    },

    global_reconnect: function (data) {
        //重连成功，解码对手信息
        var ret = pvp_public_code.read_reconnect_info_value(data);

        //对手分值，可以展示出来
        var game_value = ret.game_value;

        //对手信息二进制编码
        var user_info = ret.user_info;

        //解码对手信息
        this.rival_info = pvp_private_code.read_local_user_info(user_info);

        if(ret.type == 0){//断线方等待对手发送场景数据
            pvp_utils.show_tips("已经重新连接对手‘" + this.rival_info.name + "’,等待对方发送场景数据！", 5);
        }
        else{//在线方向对方发送场景数据
            pvp_utils.show_tips("对手‘" + this.rival_info.name + "’已经重新进入, 向对方发送场景数据！", 5);
        }
    },

    global_res_game_ask: function (data) {
        //获取消息数据
        var ret = pvp_public_code.read_info_value(data);

        //对手游戏分值
        var game_value = ret.game_value;

        //对手信息编码
        var user_info = ret.user_info;

        //解码对手信息
        this.rival_info = pvp_private_code.read_local_user_info(user_info);

        //展示对手信息，询问是否接受挑战
        pvp_ask_box.instance().show("'" + this.rival_info.name + "'想与您对战，是否接受？",  
                                    this, this.agree_join_game, this.disagree_join_game);
    },

    agree_join_game: function () {
        //接受挑战，发送接受的消息数据
        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_join, pvp_public_code.result_res(0));
    },

    disagree_join_game: function () {
        //拒绝挑战，发送拒绝的消息数据
        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_join, pvp_public_code.result_res(1));
        //pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_exit, "");
    },

    global_res_join: function (data) {
        
        var ret = pvp_public_code.read_guid_res(data);//是否接受挑战的返回数据
        
        if(ret.res == 0){//对方接受挑战
            if(ret.guid == pvp_utils.get_guid()){
                
                this.is_rival = false;//标记挑战者

                pvp_utils.show_tips("即将开始对战！", 2);

                this.wx_game_init();//开始初始化并同步场景数据
            }else{
                
                this.is_rival = true;//标记挑战者

                pvp_utils.show_tips("即将开始对战！", 2);

                //挑战者客户端交换角色位置，保持两个客户端角色初始位置一致
                var x = this.player.x;
                this.player.x = this.rival.x;
                this.rival.x = x;
            }
        }else{//对方拒绝挑战
            pvp_ask_box.instance().show("对方拒绝加入，点确定重新匹配!",  this, this.req_rival);
        }
    },

    wx_game_init: function () {
        //预置80个星星坐标，因为有单个消息包长度不能超过1000字节的限制，所以需要分多消息传输

        //预置40个星星坐标
        this.createNewStarPostionArray(40);

        var obj_data_part = pvp_private_code.result_star_postion(this.star_point_array);

        var obj_code_part = pvp_public_code.result_cmd_data(pvp_private_msg.local_msg_init_round_data_part, obj_data_part);
        /*******此处限制length不能超过1000**********/
        console.log(obj_code_part.length);

        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_send_to_table, obj_code_part);

        //预置40个星星坐标
        this.createNewStarPostionArray(40);

        var obj_data_over = pvp_private_code.result_star_postion(this.star_point_array);

        var obj_code_over = pvp_public_code.result_cmd_data(pvp_private_msg.local_msg_init_round_data_over, obj_data_over);
        /*******此处限制length不能超过1000**********/
        console.log(obj_code_over.length);

        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_send_to_table, obj_code_over);
    },

    round_init_part: function (data) {
        //接收部分坐标数据
        var ret = pvp_private_code.read_star_postion(data);
        this.star_point_array = ret.arr_point;
    },

    round_init_over: function (data) {
        //接收部分坐标数据
        var ret = pvp_private_code.read_star_postion(data);

        //合并坐标数据
        this.star_point_array.push.apply(this.star_point_array, ret.arr_point);

        //去除询问
        pvp_ask_box.instance().destory();
        //设置开始坐标
        this.star_point_index = 0;
        //开头跳动
        this.startPlayer();
    },

    send_rival_left: function () {
        //请求向左移动
        var obj_code = pvp_public_code.result_cmd_data(pvp_private_msg.local_msg_run_left, "");
        //只发送给对手
        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_send_to_rival, obj_code);
    },

    send_rival_right: function () {
        //请求向右移动
        var obj_code = pvp_public_code.result_cmd_data(pvp_private_msg.local_msg_run_right, "");
        //只发送给对手
        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_send_to_rival, obj_code);
    },

    send_rival_stop: function () {
        //请求停止
        var obj_code = pvp_public_code.result_cmd_data(pvp_private_msg.local_msg_run_stop, "");
        //只发送给对手
        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_send_to_rival, obj_code);
    },
    
    rival_run_left: function (data) {
        this.rival.getComponent('Player').accLeft = true;
        this.rival.getComponent('Player').accRight = false;
    },

    rival_run_right: function (data) {
        this.rival.getComponent('Player').accLeft = false;
        this.rival.getComponent('Player').accRight = true;
    },

    rival_run_stop: function (data) {
        this.rival.getComponent('Player').accLeft = false;
        this.rival.getComponent('Player').accRight = false;
    },
});
