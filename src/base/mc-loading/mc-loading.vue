<template>
	<div class="mc-loading">
	<img width="24" height="24" src="./loading.gif"/>
	<p class="loading-title">{{title}}</p>
	</div>
</template>
<script type="text/javascript">
	export default {
		props:{
			title:{
				type:String,
				default:"正在载入"
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "~assets/stylus/theme"
	.mc-loading
		width:100%
		height:100%
		text-align:center
		.loading-title
			line-height:20px
			font-size:$font-size-small
			color:$color-text-l
</style>