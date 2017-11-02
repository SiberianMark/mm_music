// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入babel-pollyfill使项目支持ES6+的新增对象函数等特性
import 'babel-polyfill'
import fastclick from 'fastclick'
import LazyLoad from 'vue-lazyload'

import store from './store'

//引入公共样式
import commonStyl from './assets/stylus/common'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(LazyLoad)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },

})
