//vuex状态

import {playMode} from 'assets/js/config'

const state = {
	singer: {},
	playing: false,  //播放器播放状态
	fullScreen: false, //当前播放器形态
	playList: [],//当前播放列表
	sequenceList: [],//顺序播放列表
	mode: playMode.SEQUENCE,//当前播放顺序模式
	currentIndex: -1,  //当前播放歌曲index
}

export default state