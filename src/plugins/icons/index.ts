import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import Vue from 'vue'

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
requireAll(req);
