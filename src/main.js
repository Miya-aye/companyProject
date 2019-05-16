// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css"
// import VueResource from 'vue-resource'
import axios from 'axios'

Vue.use(Antd)
// Vue.use(VueResource)
// Vue.use(axios)

Vue.prototype.$ajax = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
