<template>
	<div class="mc-swiper" ref="mcSwiper">
		<div class="swiper-group" ref = "swiperGroup">
			<slot></slot>
		</div>
		<div class="mc-dots">
			<span class="mc-dot" :class="{active : currentPageIndex === index}" v-for="(item,index) in dots"></span>
		</div>
	</div>
	
</template>
<script type="text/javascript">
import {addClass} from 'assets/js/dom.js'
import BScroll from 'better-scroll'
	export default {
		name: 'mc-swiper',
		props:{
			loop:{
				type:Boolean,
				default:true
			},
			autoPlay:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:4000
			}
		},
		data(){
			return {
				dots:[],
				currentPageIndex:0
			}
		},
		mounted(){

			// setTimeout(()=>{
				this._setSwiperWidth();//设置轮播图宽度
				// this.initDot();//设置锚点数量
				 this._initSwiper();//初始化轮播图
				if(this.autoPlay){
					this._play()
				}
				window.addEventListener('resize',()=>{
					if(!this.swiper){
						return
					}
					this._setSwiperWidth(true)
					this.swiper.refresh()
					this._play()
				})

			// },0)
		},
		activated() {
	      if (this.autoPlay) {
	        this._play()
	      }
	    },
	    deactivated() {
	      clearTimeout(this.timer)
	    },
	    beforeDestroy() {
	      clearTimeout(this.timer)
	    },
	    destroy() {
	    	clearTimeout(this.timer)
	    },
		methods:{
			_setSwiperWidth(isResize){//横向无法自动撑开宽度（换行或者隐藏），只能手动设置，计算并设置swiper的宽度
				this.children = this.$refs.swiperGroup.children//vue 父组件异步数据 传递 到子组件时 mounted无法获取数据bug，目前先用延迟500毫秒渲染，保证数据获取成功再执行
				this.dots.length=this.children.length
				let width=0
				
				let swiperWidth = this.$refs.mcSwiper.clientWidth 
				//为子元素添加类名
				//设置swiper-item宽度
				for(let i = 0 ; i < this.children.length;i++){
					let child = this.children[i]
					addClass(child,'slider-item')
					child.style.width = swiperWidth + 'px'
					width += swiperWidth
				}
				//如果是循环轮播
				if(this.loop && !isResize){
					width += 2*swiperWidth
				}
				this.$refs.swiperGroup.style.width = width + 'px'

			},
			_initSwiper(){
				this.swiper = new BScroll(this.$refs.mcSwiper,{
					scrollX:true,
					scrollY:false,
					momentum:false,//惯性
					snap:true,
					snapLoop:true,
					snapThreshold:0.3,
					snapSpeed:400,
					click:true
				})
				this.swiper.on('scrollEnd',()=>{
					let pageIndex = this.swiper.getCurrentPage().pageX?this.swiper.getCurrentPage().pageX:0
					if(this.loop){
						pageIndex -= 1
					}
					this.currentPageIndex = pageIndex
					if(this.autoPlay){
						clearTimeout(this.timer)
						this._play()
					}
				})
			},
			_initDots(){
				
			},
			_play(){
				let pageIndex = this.currentPageIndex + 1
		        if (this.loop) {
		          pageIndex += 1
		        }
		        this.timer = setTimeout(() => {
		          this.swiper.goToPage(pageIndex, 0, 400)
		        }, this.interval)
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~assets/stylus/theme'
	.mc-swiper
		min-height:1px
		position:relative
		.swiper-group
			position: relative
			overflow:hidden
			white-space:nowrap
			.mc-swiper-item
				float:left
				box-sizing:border-box
				text-align:center
				overflow:hidden
				a
					display:block
					width:100%
					overflow:hidden
					text-decoration:none
					img
						display:block
						width:100%
	.mc-dots
		position:absolute
		right:0
		left:0
		bottom:12px
		text-align:center
		.mc-dot
			display:inline-block
			margin:0 4px
			width:8px
			height:8px
			border-radius:50%
			background-color:$color-text-l
			&.active
				width:20px
				border-radius:5px
				background-color:$color-text-ll
		
					
</style>