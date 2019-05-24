var public_msg = {
    /*---------------websocket msg---------------*/
    WAN_url: "wss://www.whyouyou-srv1.com/wss",
    websocket_on_open: 10,
    websocket_on_close: 11,
    websocket_on_error: 12,
    /*---------------global msg---------------*/
    public_msg_heartbeat: 1,
    public_msg_req_login: 4,
    public_msg_res_login: 5,
    public_msg_req_wx_game_send_to_all: 2028,
    public_msg_res_wx_game_send_to_all: 2029,
    public_msg_req_wx_game_send_to_table: 2030,
    public_msg_res_wx_game_send_to_table: 2031,
    public_msg_req_wx_game_send_to_rival: 2032,
    public_msg_res_wx_game_send_to_rival: 2033,
    public_msg_res_wx_game_exit: 2034,
    public_msg_req_wx_game_rival: 2035,
    public_msg_res_wx_game_rival: 2036,
    public_msg_push_wx_game_ask: 2037,
    public_msg_req_wx_game_join: 2038,
    public_msg_res_wx_game_join: 2039,
    public_msg_req_wx_game_updae_value: 2040,
    public_msg_res_wx_game_updae_value: 2041,
    public_msg_wx_game_rival_disconnect: 2042,
    public_msg_wx_game_msg_over_limit: 2043,
}
module.exports = public_msg;