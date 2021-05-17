import {loginFormDataModel} from "@/model/user.model";
import userService from "@/api/userService";
import {ActionContext} from "vuex";
import {setToken, removeToken} from "@/utils/auth";
import {resetRouter} from "@/router";

const state = {
  token: '',
  avatar: '',
  roles: [],
  rolePermission: ''
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
  },
  SET_ROLE_PERMISSION: (state: any, rolePermission: string) => {
    state.rolePermission = rolePermission
  }
};

const actions = {
  login({commit}: ActionContext<any, any>, loginFormData: loginFormDataModel) {
    return new Promise(((resolve, reject) => {
      userService.postLogin(loginFormData).then(res => {
        const {token, avatar, roles, rolePermission} = res.data;

        commit('SET_TOKEN', token);
        // commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80');
        // commit('SET_ROLES', roles);
        // commit('SET_ROLE_PERMISSION', rolePermission);

        setToken(token);
        resolve();
      }).catch(err => {
        reject(err)
      })
    }))
  },

  logout({commit, dispatch}: ActionContext<any, any>) {
    return new Promise(async resolve => {
      //clear userInfo
      commit('SET_TOKEN', '');
      commit('SET_AVATAR', '');
      commit('SET_ROLES', []);
      commit('SET_ROLE_PERMISSION', '');

      //clear cacheRoutes
      await dispatch('tagsBar/delAllView', null, {root: true});

      removeToken();
      resetRouter();

      resolve();
    })
  },

  resetToken({commit}: ActionContext<any, any>){
    return new Promise(async resolve => {
      //clear userInfo
      commit('SET_TOKEN', '');
      commit('SET_AVATAR', '');
      commit('SET_ROLES', []);
      commit('SET_ROLE_PERMISSION', '');

      removeToken();

      resolve();
    })
  },

  getUserInfo({commit}: ActionContext<any, any>) {
    return new Promise((resolve, reject) => {
      userService.getUserInfo().then(res => {
        const {data} = res

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {token, avatar, roles, rolePermission} = data;

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_TOKEN', token);
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80');
        commit('SET_ROLES', roles);
        commit('SET_ROLE_PERMISSION', rolePermission);

        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  }
};

const getters = {
  token: (state: any) => state.token,
  roles: (state: any) => state.roles,
  rolePermission: (state: any) => state.rolePermission,
  avatar: (state: any) => state.avatar
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
