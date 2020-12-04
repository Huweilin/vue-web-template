import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // ele 样式

import './assets/css/index.less' // 公共样式文件
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'  //图标库

import PublicComponents from '@/components'
import tools from './utils/js/tools.js'   // 工具函数
import serve from './utils/serve/serve.js'   // 请求服务文件

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(PublicComponents)

Vue.prototype.$Serve = serve;
Vue.prototype.$Tools = tools;

function getHttpHost () {
  return new Promise((resolve) => {
    axios.get('/config.json').then(res => {
      if (process.env.NODE_ENV == 'development') {
        axios.defaults.baseURL = process.env.BASE_URL
      } else {
        axios.defaults.baseURL = res.target
      }
      resolve()
    })
  })
}

getHttpHost().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
