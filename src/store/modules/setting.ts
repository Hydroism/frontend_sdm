// @ts-ignore
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const {showSettings, tagsBar, fixedHeader, sidebarLogo} = defaultSettings;

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsBar: tagsBar,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

const mutations = {};

const actions = {};

const getters = {
  theme: (state: any) => state.theme,
  fixedHeader: (state: any) => state.fixedHeader,
  sidebarLogo: (state: any) => state.sidebarLogo,
  tagsBar: (state: any) => state.tagsBar
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
