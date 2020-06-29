import {loginFormDataModel} from "@/model/user.model";
import userService from "@/api/userService";
import {ActionContext} from "vuex";
import {setToken, removeToken} from "@/utils/auth";
import {resetRouter} from "@/router";

const state = {
  token: '',
  avatar: '',
  roles: []
};

const mutations = {
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },
  SET_AVATAR: (state: any, avatar: string) => {
    state.avatar = avatar
  },
  SET_ROLES: (state: any, roles: string[]) => {
    state.roles = roles
  }
};

const actions = {
  login({commit}: ActionContext<any, any>, loginFormData: loginFormDataModel) {
    return new Promise(((resolve, reject) => {
      userService.postLogin(loginFormData).then(res => {
        const {token, avatar, roles} = res.data;

        commit('SET_TOKEN', token);
        commit('SET_AVATAR', avatar);
        commit('SET_ROLES', roles);

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
    commit('SET_ROLES', '');

    removeToken();
    resetRouter();
  },

  getUserInfo({commit}: ActionContext<any, any>) {
    return new Promise((resolve, reject) => {
      userService.getUserInfo().then(res => {
        const {data} = res

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {token, avatar, roles} = data;

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_TOKEN', token);
        commit('SET_AVATAR', avatar);
        commit('SET_ROLES', roles);

        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  }
};

const getters = {
  token: (state: any) => state.token,
  roles: (state: any) => state.roles
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
