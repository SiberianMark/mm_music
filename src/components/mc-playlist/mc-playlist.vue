<template>
	<div class="mc-playlist">
		<h1 class="playlist-title">热门歌单</h1>
		<ul>
			<li v-for="(item,index) in playlist">
				<div class="icon">
					<img width="60" height="60" :src="item.imgurl"/>
				</div>
				<div class="text">
					<h2 class="name" v-html="item.creator.name"></h2>
					<p class="desc" v-html="item.dissname"></p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				playlist:[],
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	
</style>