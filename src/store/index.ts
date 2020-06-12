import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles:any = require.context('./modules', false, /\.ts$/)
const modules:any = {};

modulesFiles.keys().forEach((key:string) => {
  modules[key.replace(/^\.\/(.*)\.\w+$/, '$1')] = modulesFiles(key).default;
});
Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true;
});

export default new Vuex.Store({
  modules
})
