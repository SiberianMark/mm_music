<template>
	<transition name="slide">
		<McMusicList :title="title" :bgImage="bgImage" :songs="songs"></McMusicList>
		</div>	
	</transition>
</template>
<script type="text/javascript">
import McMusicList from 'components/mc-musiclist/mc-musiclist'

import Api from 'assets/js/api'
import {createSong} from 'assets/js/class/Song'
import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				singerData:{},
				songs: []
			}
		},
		computed: {
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			},
	      ...mapGetters([
	        'singer'
	      ]),

	     
	    },
		created() {
			this.singerId = this.singer.id
			setTimeout(()=>{
				this._getSingerDetail(this.singerId)
			},20)
		},
		mounted() {
			console.log(1)
			console.log(this.singer)
			console.log(1)
		},
		methods: {
			_getSingerDetail(singerid){
				Api.getSingerDetail(singerid).then((res)=>{
					if(res.code === 0){
						// console.log(res)
						// this.singerData = res
						this.songs = this._nomalizeSong(res.data.list)
						
					}
				})
			},
			_nomalizeSong(list) {
				let ret = []
				// console.log(list)
				list.forEach((s,i)=>{
					let musicData = s.musicData
					if(musicData.songid && musicData.albummid){
						ret.push(createSong(musicData))
					}
					
				})
				return ret
			}
		},
		components: {
			McMusicList
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~assets/stylus/theme'
	.mc-singerdetail
		position:fixed
		top:0
		bottom:0
		width:100%
		background-color:#000
	.slide-enter-active,.slide-leave-active
		transition: all 0.3s
	.slide-enter,.slide-leave-to
		transform:translate3d(100%,0,0)
</style>