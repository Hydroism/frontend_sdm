import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/permission'
import store from './store'
import './plugins'
import './styles/index.scss'

Vue.config.productionTip = false

// if (process.env.NODE_ENV === "development") {
//   const { mockXHR } = require("../mock/static");
//   mockXHR();
// }

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default vue
