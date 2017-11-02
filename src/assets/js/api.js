import {jsonp} from './http'
import {commonConf,options,APILIST} from './config'
import axios from 'axios'

export default {
	getRecommend: ()=>{//获取轮播图数据
		const data = Object.assign({},commonConf,{
			platform: 'h5',
			uin: 0,
			needNewCode: 1
		});
		return jsonp.jsonp(APILIST.RECOMMEND,data,options)
	},
	getPlayList: ()=>{//获取歌单列表
		let data = Object.assign({},commonConf,{
			platform: 'yqq',
			sortId:5,
			sin:0,
			ein:29,
			rnd:Math.random(),
			loginUin:0,
			hostUin:0,
			needNewCode:0,
			categoryId:10000000,
			format:'json',
		})
		return axios.get(APILIST.PLAYLIST,{
			params:data
		}).then((res)=>{
			return Promise.resolve(res.data)
		})
	},
	getSingerList: ()=>{
		let data = Object.assign({},commonConf,{
			platform:'yqq',
			channel:'singer',
			page:'list',
			key:'all_all_all',
			pagesize:100,
			pagenum:1,
			loginUin:0,
			hostUin:0,

		})
		return jsonp.jsonp(APILIST.SINGERLIST,data,options);
	},
	getSingerDetail(singerId){
		let data = Object.assign({},commonConf,{
			order:'listen',
			begin:0,
			num:60,
			singermid:singerId,
			uid:0,
			from:'h5',
			_:1501831363639
		});
		return jsonp.jsonp(APILIST.SINGERDETAIL,data,options)
	}
}
// https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=yqq&sortId=5&sin=0&ein=29&rnd=0.8175214483817808&loginUin=0&hostUin=0&categoryId=10000000&jsonpCallback=getPlaylist