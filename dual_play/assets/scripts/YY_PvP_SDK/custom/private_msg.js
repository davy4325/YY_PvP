var private_msg = {
    /*-------------- pvp sdk info ----------------*/
    company_guid: "fd9d4907-3c34-4b66-a908-3b79816546a8",
    game_type: 111,

    /*---------------local msg---------------*/
    local_msg_init_round_data_part: 80001,//同步场景
    local_msg_init_round_data_over: 80002,//同步场景
    local_msg_run_left: 80003,//向左移动
    local_msg_run_right: 80004,//向右移动
    local_msg_run_stop: 80005,//停止移动
    local_msg_game_over: 80006,//游戏结束
}
module.exports = private_msg;