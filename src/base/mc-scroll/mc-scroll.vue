<template>
	<div class="mc-scroll" ref="wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'
	export default {
		props:{
			probeType: {
				type:Number,
				default:1
			},
			click: {
				type:Boolean,
				default:true
			},
			data: {
				type:Array,
				default:null
			},
			refreshDelay: {
				type:Number,
				default:20
			},
			listenScroll: {
				type:Boolean,
				default:true
			}
			
		},
		mounted() {
				this._initScroll()
				this.refresh()
		},
		methods:{
			_initScroll() {
					if(!this.$refs.wrapper){
						return
					}
					this.scroll = new BScroll(this.$refs.wrapper, {
			          probeType: this.probeType,
			          click: this.click
			        })
			        if (this.listenScroll) {
			          let me = this
			          this.scroll.on('scroll', (pos) => {
			            me.$emit('scroll', pos)
			          })
			        }
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
				console.log(this.scroll)
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}

		},
		watch: {
	      data() {
	        setTimeout(() => {
	          this.refresh()
	        }, this.refreshDelay)
	      }
	    }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '~assets/stylus/theme'
</style>