// @ts-ignore
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import {ActionContext} from "vuex";

const {showSettings, tagsBar, fixedHeader, sidebarLogo} = defaultSettings;

const state = {
  showSettings: showSettings,

  theme: variables.theme,
  tagsBar: tagsBar,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

const mutations = {
  CHANGE_SETTING: (state:any, { key, value }:SettingModel) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
};

const actions = {

  changeSetting({ commit }: ActionContext<any, any>, data:SettingModel) {
    commit('CHANGE_SETTING', data)
  }
};

const getters = {
  theme: (state: any) => state.theme,
  fixedHeader: (state: any) => state.fixedHeader,
  sidebarLogo: (state: any) => state.sidebarLogo,
  tagsBar: (state: any) => state.tagsBar,
  showSettings: (state: any) => state.showSettings
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}

interface SettingModel {
  key:string,
  value:boolean|string
}
