const pvp_connect = require('./YY_PvP_SDK/net/connect');
const pvp_net_queue = require('./YY_PvP_SDK/net/net_queue');
const pvp_utils = require('./YY_PvP_SDK/comm/utils');
const pvp_ask_box = require('./YY_PvP_SDK/comm/ask_box');
const pvp_public_msg = require('./YY_PvP_SDK/comm/public_msg');
const pvp_code = require('./YY_PvP_SDK/custom/code');
const pvp_private_msg = require('./YY_PvP_SDK/custom/private_msg');

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
    },

    startPlayer: function(event){
        this.player.getComponent('Player').startJump();
        this.player.getComponent('Player').initKeyEvent();
        this.startButton.active = false;
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

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
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

    onStartButton: function(event){
        this.connect_to_server(); 
    },

    connect_to_server: function () {
        pvp_utils.show_loading();
        pvp_connect.instance().connect_to(pvp_public_msg.WAN_url);
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
            default:
                break;
        }
    },

    websocket_on_close: function () {
        cc.log("网络连接断开!");
    },

    websocket_on_error: function () {
        pvp_utils.hide_loading();
        pvp_utils.show_tips("无法连接服务器，请稍后再试!", 2);
    },

    websocket_on_open: function () {
        var user_guid = "";
        if(pvp_utils.guid_is_empty()){
            user_guid = pvp_utils.uuid();
            pvp_utils.save_guid(user_guid);
        }else{
            user_guid = pvp_utils.get_guid();
        }

        var name = pvp_utils.get_model();
        var user_info_code = pvp_code.result_local_user_info(name, 10);

        var obj_code = pvp_code.result_guid_type_value_info(pvp_private_msg.company_guid, pvp_private_msg.game_type, user_guid, 1000, user_info_code);

        pvp_connect.instance().send_cmd(pvp_public_msg.public_msg_req_login, obj_code);
    },

});
