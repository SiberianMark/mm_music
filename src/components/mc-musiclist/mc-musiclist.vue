<template>
	<div class="mc-musiclist">
		<div class="musiclist-head">
			<div class="back" @click="back"><i class="backto-icon icon-back"></i></div>
			<div class="singer-name">{{title}}</div>
			<div :style="bgStyle" class="singer-img" ref="refBgImage">
			<div class="playBtn" ref="playBtn" v-show="songs.length" @click="random">
				<i class="icon-play"></i><span>随机播放全部</span></div>
			</div>
		</div>
		<div class="bg-layer" ref="refBgLayer"></div>
		<div class="musiclist-songlist" ref="refSonglistCont">
		<mc-scroll class="mc-listsong-sc" 
		:data="songs" 
		:listen-scroll ="listenScroll" 
		:probe-type="probeType"
		@scroll="scroll">
			<McSonglist :songList="songs" @select="selectItem"></McSonglist>
			</mc-scroll>
		</div>
	</div>
</template>
<script type="text/javascript">
	import McScroll from 'base/mc-scroll/mc-scroll'
	import McSonglist from 'base/mc-songlist/mc-songlist'
	import {prefixStyle} from 'assets/js/dom'
	import Loading from 'base/mc-loading/mc-loading'

	import {mapActions} from 'vuex'

	const transform = prefixStyle('transform')

	const RESERVED_HEIGHT = 40
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			bgImage: {
				type: String,
				default: ''
			},
			songs: {
				type: Array,
				default: this.songlist
			}		
		},
		data() {
			return {
				scrollY: -1
			}
		},
		created() {
			
		},
		computed: {
			bgStyle() {
				return `background:url(${this.bgImage})  no-repeat;background-size:100%;`
			},
			songlist() {
				return [];
			},
			listenScroll() {
				return true
			},
			probeType() {
				return 3
			},
			
		},
		methods: {
			scroll(pos) {
				this.scrollY = pos.y
			},
			back() {
				this.$router.back()
			},
			random() {
				
			},
			selectItem(song,index){
				this.selectPlay({
					list:this.songs,
					index
				})
			},
			...mapActions([
				'selectPlay',
				])
		},
		mounted() {
			this.imageHeight = this.$refs.refBgImage.clientHeight
      		this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
			this.$refs.refSonglistCont.style.top = `${this.$refs.refBgImage.clientHeight}px`
		},
		watch: {
			scrollY(newY) {
				let translateY = Math.max(this.minTransalteY, newY)
				let zIndex = 0
				let scale = 1
				const percent = Math.abs(newY/this.imageHeight)
				if (newY > 0) {
		          scale = 1 + percent
		          zIndex = 10
		        } else {
		          blur = Math.min(20, percent * 20)
		          zIndex = 0
		        }
				if (newY < this.minTransalteY) {
		          zIndex = 10
		          this.$refs.refBgImage.style.paddingTop = 0
		          this.$refs.refBgImage.style.height = `${RESERVED_HEIGHT}px`
		          this.$refs.playBtn.style.display = 'none'
		        } else {
		          this.$refs.refBgImage.style.paddingTop = '70%'
		          this.$refs.refBgImage.style.height = 0
		          this.$refs.playBtn.style.display = ''
		        }
		        this.$refs.refBgImage.style[transform] = `scale(${scale})`
        		this.$refs.refBgImage.style.zIndex = zIndex
				this.$refs.refBgLayer.style[transform] = `translate3d(0,${translateY}px,0)`
			}
		},
		components:{
			McSonglist,
			McScroll,
			Loading
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~assets/stylus/theme'
	.mc-musiclist
		position: fixed
		top: 0
		bottom: 0
		width: 100%
		background: $color-background
		.musiclist-head
			position:relative
			.back
				position:absolute
				top:0
				left:6px
				z-index: 99
				.backto-icon
					display:block
					padding:10px
					font-size:$font-size-large-x
					color:$color-theme
			.singer-name
				position:absolute
				top: 16px
				left: 10%
				width: 80%
				text-align: center
				z-index: 99
			.singer-img
				position: relative
				width: 100%
				height: 0
				padding-top: 70%
				transform-origin: top
				background-size: cover
			.playBtn
				width: 50%
				margin-left: 25%
				text-align: center
				position: absolute
				bottom: 20px
				line-height: 30px
				color:$color-theme
				border: 1px solid $color-theme
				border-radius: 25px

		.musiclist-songlist
			position:fixed
			width: 100%
			bottom:0
			.mc-listsong-sc
				// overflow:hidden
				height:100%
		.bg-layer
			width:100%
			height:100%
			background:$color-background
				
</style>