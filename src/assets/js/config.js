export const commonConf = {
		g_tk:1928093487,
		inCharset:'utf-8',
		outCharset:'utf-8',
		notice:0,
		format:'jsonp'	
};
export const options = {
	param:'jsonpCallback'
};
export const APILIST = {
	RECOMMEND:'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',//推荐页轮播图
	PLAYLIST:'api/getPlayList',//歌单列表
	SINGERLIST:'https://c.y.qq.com/v8/fcg-bin/v8.fcg',//歌手列表
	SINGERDETAIL:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',//歌手详情
};

export const ERR_OK = 0;
// https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1&jsonpCallback=__jp0
// https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1&jsonpcallback=__jp0

//播放顺序模式定义
export const playMode = {
	SEQUENCE: 0,
	LOOP: 1,
	RANDOM:2
};