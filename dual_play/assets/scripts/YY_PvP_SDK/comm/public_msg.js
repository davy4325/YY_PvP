var public_msg = {
    /*---------------websocket msg---------------*/
    WAN_url: "wss://www.whyouyou-srv1.com/wss",
    websocket_on_open: 10,
    websocket_on_close: 11,
    websocket_on_error: 12,
    websocket_on_repeat: 13,
    websocket_on_prev_close: 14,
    /*---------------global msg---------------*/
    public_msg_heartbeat: 1,
    public_msg_req_login: 4,
    public_msg_res_login: 5,
    public_msg_req_send_to_all: 2028,
    public_msg_res_send_to_all: 2029,
    public_msg_req_send_to_table: 2030,
    public_msg_res_send_to_table: 2031,
    public_msg_req_send_to_rival: 2032,
    public_msg_res_send_to_rival: 2033,
    public_msg_req_close: 2034,
    public_msg_req_rival: 2035,
    public_msg_res_rival: 2036,
    public_msg_push_ask: 2037,
    public_msg_req_join: 2038,
    public_msg_res_join: 2039,
    public_msg_req_update_user_info: 2040,
    public_msg_res_update_user_info: 2041,
    public_msg_req_set_friend_mode: 2042,
    public_msg_res_set_friend_mode: 2043,
    public_msg_rival_disconnect: 2044,
    public_msg_over_limit: 2045,
	public_msg_req_reset_rival: 2046,
	public_msg_res_reset_rival: 2047,
	public_msg_req_exit: 2048,
	public_msg_res_exit: 2049,
    public_msg_reconnect: 2050,
    public_msg_rival_exit: 2051,
    public_msg_req_friend_rival: 2052,
    public_msg_res_friend_rival: 2053,
    public_msg_req_network_test: 2054,
    public_msg_res_network_test: 2055,
    public_msg_notice: 2058,
    public_msg_res_match_remind: 2059,

    public_msg_req_join_match: 1201,
    public_msg_res_join_match: 1202,
    public_msg_req_quit_match: 1204,
    public_msg_res_quit_match: 1205,
    public_msg_res_match_wait_info: 1207,
    public_msg_res_match_start: 1208,
    public_msg_res_match_detail_rank: 1209,
    public_msg_res_match_reward: 1212,
    public_msg_req_battle_guid: 1245,
    public_msg_res_battle_guid: 1246,
    public_msg_req_battle_result: 1247,
    public_msg_res_battle_result: 1248,
    public_msg_user_enroll: 1249,
    public_msg_req_match_enroll_count: 1250,
    public_msg_res_match_enroll_count: 1251,
}
module.exports = public_msg;