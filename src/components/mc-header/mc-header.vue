<template>
	<div class="mc-header">
		<div class="icon icon-header"></div>
		<div class="header-title">MC Music</div>
	</div>
</template>	
<script type="text/javascript">
	
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
// 必须在本模块引入才能进行使用，在全局引入无效果
@import '~assets/stylus/theme'
@import '~assets/stylus/mixin'

	.mc-header
		height:44px
		display:flex
		color:$color-theme
		align-item:center
		justify-content:center
		.icon
			display:inline-block
			margin-top:6px
			width:30px
			height:32px
			margin-right:9px
			bg-image('./logo')
			background-size:30px 32px
		.header-title
			display:inline-block
			align-self:center
			
</style>