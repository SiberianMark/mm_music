<template>
<div class="mc-listview">
	<mc-scroll class="mc-listview" 
		@scroll="scroll"
		:probe-type="probeType"
		:data="data" 
		:listen-scroll="listenScroll" 
		ref="McListview" 
		>
		<div class="list-group">
			<ul>
				<li class="group-item" v-for="(group,index) in data" ref="listGroup">
					<h2 class="group-title">{{group.title}}</h2>
					<ul>
						<li class="list-group-item" v-for="(item,itemIndex) in group.items" @click="selectItem(item)">
							<img class="avatar" v-lazy="item.avatar">
							<span class="name">{{item.name}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<div v-show="!data.length" class="loading-container">
			<mc-loading></mc-loading>
		</div>
		<ul class="shortcut-list" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
			<li class="item" :class="{active: currentIndex === index}" v-for="(item,index) in shortcutList" :data-index="index">{{item}}</li>
		</ul>
		<div class="fixed-title" v-show="fixedtitle" ref="fixed">
			{{fixedtitle}}
		</div>
	</mc-scroll>
	
</div>
</template>
<script type="text/javascript">
	import McScroll from 'base/mc-scroll/mc-scroll'
	import McLoading from 'base/mc-loading/mc-loading'

	import {getData} from 'assets/js/dom'
	const ANCHOR_HEIGHT = 18
	const TITLE_HEIGHT = 30
	export default {
		name: 'mc-listview',
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				currentIndex: 0,
				scrollY: -1,
				diff: -1
			}
			
		},
		computed: {
			shortcutList(){
				return this.data.map((group,index)=>{
						return group.title.substr(0,1)
				})
			},
			fixedtitle() {
				if(this.scrollY > 0){
					return ''
				}
				return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
			}
		},
		created() {
			this.probeType = 3
			this.touch = {}
			this.listenScroll= true
			this.listHeight = []
			

		},
		mounted() {
			
		},
		methods: {
			onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target,'index')
				let firstTouch = e.touches[0]
				this.touch.y1 =firstTouch.pageY
				this.touch.anchorIndex = anchorIndex
				this.$refs.McListview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
				this._scrollTo(anchorIndex)
			},
			onShortcutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				let delta = (this.touch.y2 - this.touch.y1)/ANCHOR_HEIGHT | 0
				let anchorIndex = parseInt(this.touch.anchorIndex) +delta
				this._scrollTo(anchorIndex)
			},
			scroll(pos) {
				this.scrollY = pos.y
			},
			_calculateHeight(){
				this.listHeight = []
				const list =this.$refs.listGroup
				let height = 0
				this.listHeight.push(height)
				for(let i = 0; i<list.length;i++){
					let item =list[i]
					height +=item.clientHeight
					this.listHeight.push(height)
				}
			},
			_scrollTo(index) {
				if (!index && index !== 0) {
		          return
		        }
		        if (index < 0) {
		          index = 0
		        } else if (index > this.listHeight.length - 2) {
		          index = this.listHeight.length - 2
		        }
				this.scrollY = -this.listHeight[index]
				this.$refs.McListview.scrollToElement(this.$refs.listGroup[index],0)
			},
			selectItem(item) {//点击，只派发事件，不做具体业务逻辑
				this.$emit('select',item)
			}
		},
		watch: {
			data() {
				setTimeout(()=>{
					this._calculateHeight()
				},20)
			},
			scrollY(newY) {
				const listHeight =this.listHeight
				//当滚动到顶部
				if(newY>0){
					this.currentIndex = 0
					return
				}
				//当滚动到中间
				for(let i = 0; i<listHeight.length; i++){
					let height1 = listHeight[i]
					let height2 = listHeight[i+1]
					if(-newY >= height1 && -newY < height2){
						this.currentIndex = i
						//优化顶部title平滑切换
						this.diff = height2 + newY
						return
					}
				}
				//当滚动到底部
				this.currentIndex = listHeight.length - 2
			},
			diff(newVal){
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT)?newVal-TITLE_HEIGHT : 0
				if(this.fixedTop === fixedTop){
					return
				}
				this.fixedTop = fixedTop
				this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
			}
			
		},
		components: {
			McScroll,
			McLoading
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~assets/stylus/theme'
	.mc-listview
		height:100%
		overflow:hidden
		.group-item
			.group-title
				height:30px
				line-height:30px
				padding-left:20px
				color:$color-text-l
				font-size:$font-size-small
				background:$color-highlight-background
			.list-group-item
				display:flex
				padding:20px 0 0 30px
				align-items: center;
				.avatar
					border-radius:50%
					width:60px
					height:60px
					flex: 0 0 60px
				.name
					margin-left:20px
					color:$color-text-l
					font-size:$font-size-medium
	.shortcut-list
		width: 30px
		background: $color-highlight-background
		font-size: $font-size-small
		text-align: center
		position:fixed
		right:0
		top:120px
		.item
			padding:5px 0
			&.active
				color:$color-theme
				font-size:$font-size-medium
	.fixed-title
		position:absolute
		top:-1px
		left:0
		width:100%
		height:30px
		line-height:30px
		padding-left:20px
		color:$color-text-l
		font-size:$font-size-small
		background:$color-highlight-background
</style>