import {ActionContext} from "vuex";

export enum DeviceEnum {
  'mobile',
  'desktop'
}

const state = {
  isCollapse: false,
  device: DeviceEnum.desktop, // desktop or mobile
};

const mutations = {
  TOGGLE_SIDEBAR: (state: any) => {
    state.isCollapse = !state.isCollapse;
  },
  CLOSE_SIDEBAR: (state: any) => {
    state.isCollapse = true;
  },
  TOGGLE_DEVICE: (state: any, device: string) => {
    state.device = device
  },

};

const actions = {
  toggleSidebar({commit}: ActionContext<any, any>) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({commit}: ActionContext<any, any>) {
    commit('CLOSE_SIDEBAR')
  },
  toggleDevice({commit}: ActionContext<any, any>, device: DeviceEnum) {
    commit('TOGGLE_DEVICE', device)
  },
};

const getters = {
  isCollapse: (state: any) => state.isCollapse,
  device: (state: any) => state.device
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}

