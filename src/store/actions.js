//异步操作
import * as types from './mutation-type'

export const selectPlay = function ({commit,state},{list,index}) {
	commit(types.SET_SEQUENCE_LIST,list) //设置顺序播放列表
	commit(types.SET_PLAY_LIST,list)	//设置默认播放列表为顺序播放
	commit(types.SET_CURRENT_INDEX,index)//设置当前播放歌曲index
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)

}