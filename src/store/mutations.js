//
import * as types from './mutation-type'
//设置state状态
const mutations = {
	[types.SET_SINGER](state,singer) {
		state.singer =singer
	},
	[types.SET_PLAYING_STATE](state,playing){
		state.playing = playing
	},
	[types.SET_FULL_SCREEN](state,fullScreen){
		state.fullScreen=fullScreen
	},
	[types.SET_PLAY_LIST](state,playList){
		state.playList = playList
	},
	[types.SET_SEQUENCE_LIST](state,sequenceList){
		state.sequenceList = sequenceList
	},
	[types.SET_MODE](state,mode){
		console.log('set:'+mode)
		state.mode = mode
	},
	[types.SET_CURRENT_INDEX](state,currentIndex){
		state.currentIndex = currentIndex
	}
}
export default mutations

