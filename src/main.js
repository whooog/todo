import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import store from 'store'
Vue.prototype.$store = store;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
