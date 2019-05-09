var net_cmd = {
    company_guid: "fd9d4907-3c34-4b66-a908-3b79816546a8",
    game_type: 1,
    /*---------------websocket msg---------------*/
    server_type: 0,//0:WAN  1:LAN
    WAN_url: "wss://www.whyouyou-srv1.com/wss",
    LAN_url: "ws://127.0.0.1:8708",
    websocket_on_open: 10,
    websocket_on_close: 11,
    websocket_on_error: 12,
    /*---------------global msg---------------*/
    global_msg_heartbeat: 1,
    global_msg_req_login: 4,
    global_msg_res_login: 5,
    global_msg_req_wx_game_send_to_all: 2028,
    global_msg_res_wx_game_send_to_all: 2029,
    global_msg_req_wx_game_send_to_table: 2030,
    global_msg_res_wx_game_send_to_table: 2031,
    global_msg_req_wx_game_send_to_rival: 2032,
    global_msg_res_wx_game_send_to_rival: 2033,
    global_msg_res_wx_game_exit: 2034,
    global_msg_req_wx_game_rival: 2035,
    global_msg_res_wx_game_rival: 2036,
    global_msg_push_wx_game_ask: 2037,
    global_msg_req_wx_game_join: 2038,
    global_msg_res_wx_game_join: 2039,
    global_msg_wx_game_rival_disconnect: 2040,
    global_msg_wx_game_msg_over_limit: 2041,

    /*---------------local msg---------------*/
    local_msg_init_round_data: 10001,
    local_msg_play_left: 10002,
    local_msg_play_right: 10003,
    local_msg_play_stop: 10004,
    local_msg_game_over: 10005,
}
module.exports = net_cmd;