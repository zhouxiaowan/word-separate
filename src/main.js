import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './assets/css/common.css'
import axios from 'axios'
import globalVariable from './assets/js/global_variable.js'
import HZRecorder from './assets/js/HZRecorder.js'


Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.global = globalVariable
Vue.prototype.HZRecorder = HZRecorder


new Vue({
  el: '#app',
  render: h => h(App)
})