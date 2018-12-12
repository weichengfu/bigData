// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'  // 引入axios
import qs from 'qs'      // 引入qs用于解析参数
import { Button, Select,Table,TableColumn,Option,Message,Tooltip } from 'element-ui';
import VCharts from 'v-charts'

Vue.prototype.$axios = axios  //将 axios 改写为 Vue 的原型属性，这样在各个组件中都可以使用axios
Vue.prototype.$qs = qs 
Vue.use(Button)
Vue.use(Select)     
Vue.use(Table)     
Vue.use(TableColumn)     
Vue.use(Option) 
Vue.use(Tooltip) 
Vue.use(VCharts)
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}    
Vue.use(Message)     

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
