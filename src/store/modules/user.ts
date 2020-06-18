import {loginFormDataModel} from "@/model/user.model";
import userService from "@/api/userService";
import {ActionContext} from "vuex";
import {setToken, removeToken} from "@/utils/auth";

const state = {
  token: '',
  avatar: '',
  role: ''
};

const mutations = {
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },
  SET_AVATAR: (state: any, avatar: string) => {
    state.avatar = avatar
  },
  SET_ROLE: (state: any, role: string) => {
    state.role = role
  }
};

const actions = {
  login({commit}: ActionContext<any, any>, loginFormData: loginFormDataModel) {
    return new Promise(((resolve, reject) => {
      userService.postLogin(loginFormData).then(res => {
        const {token, avatar, role} = res.data;

        commit('SET_TOKEN', token);
        commit('SET_AVATAR', avatar);
        commit('SET_ROLE', role);

        setToken(token);
        resolve();
      }).catch(err => {
        reject(err)
      })
    }))
  },

  logout({commit}: ActionContext<any, any>) {
    commit('SET_TOKEN', '');
    commit('SET_AVATAR', '');
    commit('SET_ROLE', '');

    removeToken();
  },
};

const getters = {
  token: (state: any) => state.token,
  role: (state: any) => state.role
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
