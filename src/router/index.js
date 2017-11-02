import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import McRank from 'components/mc-rank/mc-rank'
import McRecommend from 'components/mc-recommend/mc-recommend'
import McSinger from 'components/mc-singer/mc-singer'
import McSearch from 'components/mc-search/mc-search'
import McDisc from 'components/mc-disc/mc-disc'
import McSingerDetail from 'components/mc-singerdetail/mc-singerdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
    	path:'/rank',
    	name:'Rank',
    	component:McRank
    },
    {
    	path:'/recommend',
    	name:'Recommend',
    	component:McRecommend,
        children:[
            {
                path:':id',
                component:McDisc
            }
        ]
    },
    {
    	path:'/search',
    	name:'Search',
    	component:McSearch
    },
    {
    	path:'/singer',
    	name:'Singer',
    	component:McSinger,
        children:[
            {
                path:':id',
                component:McSingerDetail
            }
        ]
    }
  ]
})
