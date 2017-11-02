<template>
	<div class="mc-recommend" ref="recommend">
		<mc-scroll ref="scroll" class="recommend-content" :data="playList">
				<div>
					<div v-if="recommend.length">
						<mc-swiper>
							<div class="mc-swiper-item" v-for ="(item,index) in recommend"><a :href="item.linkUrl">
								<img class="needsclick" @load="loadImg" :src="item.picUrl">
							</a></div>
						</mc-swiper>
					</div>
					<div class="mc-playlist">
						<h1 class="playlist-title">热门歌单推荐</h1>
						<ul>
							<li @click="selectItem(item)" class="item" v-for="(item,index) in playList">
								<div class="icon">
									<img width="60" height="60" v-lazy="item.imgurl"/>
								</div>
								<div class="text">
									<h2 class="name" v-html="item.creator.name"></h2>
									<p class="desc" v-html="item.dissname"></p>
								</div>
							</li>
						</ul>
						<div class="loading-container" v-show="!playList.length">
					        <mc-loading></mc-loading>
					    </div>
					</div>
				</div>
		</mc-scroll>
	</div>
</template>
<script type="text/javascript">
import McSwiper from '@/base/mc-swiper/mc-swiper'
import McScroll from '@/base/mc-scroll/mc-scroll'
import McLoading from '@/base/mc-loading/mc-loading'

// import {mapMutations} from 'vuex'

import Api from 'assets/js/api'
	export default {
		data(){
			return {
				data:{},
				recommend:{},
				playList:[],
				checkload:false
			}
		},
		created:function(){
			Api.getRecommend().then((res)=>{	
				if(res.code === 0){
					this.data=res.data;
					this.recommend=res.data.slider;
				}
				
			});
			Api.getPlayList().then((res)=>{
				if(res.code === 0){
					this.playList = res.data.list
					console.log(1)
				}else{
					console.log(res)
				}
			})
			// console.log(this.playList)
		},
		methods:{
			loadImg(){
				if(!this.checkload){
					this.$refs.scroll.refresh();
					console.log(111)
					this.checkload = true
				}
				
			},
			selectItem(item) {
				// this.$router.push({
				// 	path:`/recommend/${item.dissid}`
				// })
				// this.setDisc(item)
			},
			// ...mapMutations({
		 //        setDisc: 'SET_DISC'
		 //      })
		},
		components:{
			McSwiper,
			McScroll,
			McLoading
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~assets/stylus/theme'
	.mc-recommend
		position:fixed
		width:100%
		top:88px
		bottom:0
		.recommend-content
			height:100%
			overflow:hidden
	.mc-playlist
		position:relative
		.playlist-title
			color:$color-theme
			height:65px
			display:flex
			align-items:center
			justify-content:center
			font-size:$font-size-medium
		.item
			display:flex
			align-items:center
			padding:20px
			.icon
				flex:0 0 60px
				width:60px
				padding-right:20px
			.text
				display:flex
				flex-direction:column
				justify-content:center
				flex:3
				line-height:20px
				overflow:hidden
				font-size:$font-size-medium
				.name
					color:$color-text
					margin-bottom:10px
				.desc
					color:$color-text-d
		
</style>