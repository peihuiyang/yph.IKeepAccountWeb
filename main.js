
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import myapi from './common/js/apirequest.js'
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$myapi = myapi
  return {
    app
  }
}
// #endif