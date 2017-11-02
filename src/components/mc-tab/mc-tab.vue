<template>
	<div class="mc-tab">
		<router-link tag='div' class="tab-item" to="/recommend"><span class="tab-link">推荐</span></router-link>
		<router-link tag='div' class="tab-item" to="/singer"><span class="tab-link">歌手</span></router-link>
		<router-link tag='div' class="tab-item" to="/rank"><span class="tab-link">排行榜</span></router-link>
		<router-link tag='div' class="tab-item" to="/search"><span class="tab-link">搜索</span></router-link>
	</div>
	
</template>
<script type="text/javascript">
	export default {

	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~assets/stylus/theme'
	@import '~assets/stylus/mixin'
	.mc-tab
		display:flex
		justify-content:space-around
		height:44px
		.tab-item
			align-self:center
			.tab-link
				color:$color-theme-l
				padding-bottom:5px
			&.router-link-active
				.tab-link
					color:$color-theme
					border-bottom:2px solid $color-theme
		
</style>