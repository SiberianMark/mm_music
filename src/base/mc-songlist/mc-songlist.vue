<template>
		
			<div class="mc-songlist">
			<ul class="list">
			<li class="item-li" v-for="(item,index) in songList" @click="selectItem(item,index)">
				<a  class="item-a" :href="item.url">
					<img class="item-img" :src="item.image">
					<div class="song-name">
						<p>{{item.name}}</p>
						<p class="desc" v-html="getDesc(item)"></p>
					</div>
				</a>
			</li>
		</ul>
		</div>
		
</template>
<script type="text/javascript">
	
	export default {
		props: {
			songList: {
				type: Array,
				default: this.songlistD
			}
		},
		computed: {
			songlistD() {
				return []
			},
			listenScroll() {
				return true
			}
			
		},
		methods: {
			getDesc(song) {
				return `${song.singer} 。${song.album}`
			},
			selectItem(song,index){
				this.$emit('select',song,index)
			}
		},
		components: {
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~assets/stylus/theme'
		.list
			.item-li
				.item-a
					display: flex
					align-items: center
					.item-img
						flex: 0 0 60px
						margin-right: 20px
						width: 60px
						border-radius: 50%
						margin: 20px
					.song-name
						.desc
							color:$font-color-l
							font-size:$font-size-small
							line-height:20px
					
				
</style>