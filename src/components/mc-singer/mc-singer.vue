<template>
	<div class="mc-singer">
		<McListView :data="singerList" @select="selectSinger">
		</McListView>
		<router-view></router-view>
	</div>

</template>
<script type="text/javascript">
	import Api from 'assets/js/api'

	import McListView from 'base/mc-listview/mc-listview'

	import singer from 'assets/js/class/singer'

	import {mapMutations} from 'vuex'
	const HOT_SINGER_LENGTH = 10
	const HOT_NAME = "热门"
	export default {
		data (){
			return {
				singerList:[]
			}
		},
		mounted(){
			this._getSingerList();

		},
		methods:{
			_getSingerList(){
				Api.getSingerList().then((res)=>{
					// this.singerList = res.data.list
					this.singerList=this._nomalizeSinger(res.data.list)
				})
			},
			_nomalizeSinger(list){
				let map = {
					hot: {
						title: "热门",
						items: [],
					}
				}
				list.forEach((item,index)=>{
					if(index<HOT_SINGER_LENGTH){
						map.hot.items.push({
							id:item.Fsinger_mid,
							name:item.Fsinger_name,
							avatar:'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+item.Fsinger_mid+'.jpg?max_age=2592000'
						})
					}
					const key = item.Findex
					if(!map[key]){
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(
						{
							id:item.Fsinger_mid,
							name:item.Fsinger_name,
							avatar:'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+item.Fsinger_mid+'.jpg?max_age=2592000'
						}
					)
				});
				let hot = [],
					ret = [];
				for(let i in map){
					let val = map[i];
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(map[i])
					}else if(val.title == HOT_NAME){
						hot.push(map[i])
					}
					ret.sort((a,b)=>{
						return a.title.charCodeAt(0) - b.title.charCodeAt(0);//升序
					})
				}
				console.log(hot.concat(ret));
				return hot.concat(ret);
				
			},
			selectSinger(singer) {
				//元素被选择处理函数
				this.setSinger(singer)
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		},
		components: {
			McListView
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.mc-singer
		position:fixed
		width:100%
		top:88px
		bottom:0
		overflow:hidden
</style>