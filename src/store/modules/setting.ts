// @ts-ignore
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const {showSettings, tagsView, fixedHeader, sidebarLogo} = defaultSettings;

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

const mutations = {};

const actions = {};

const getters = {
  theme: (state: any) => state.theme,
  fixedHeader: (state: any) => state.fixedHeader,
  sidebarLogo: (state: any) => state.sidebarLogo,

};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
