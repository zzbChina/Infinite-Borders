import Vue from 'vue'
import App from './App.vue'
//引入路由
import VueRouter from 'vue-router'
//引入路由器
import router from './router/index'


Vue.config.productionTip = false
Vue.use(VueRouter) // vue实例使用路由
new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
