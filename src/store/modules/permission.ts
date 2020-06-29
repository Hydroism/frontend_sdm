import {ActionContext} from "vuex";
import {RouteConfig} from "vue-router";
import routerService from "@/api/routerService";
import {filterAsyncRoutes, filterRoutes} from "@/router/handleRoutes";

const state = {
  routes: [],
};

const mutations = {
  SET_ROUTES: (state: any, routes: RouteConfig[]) => {
    state.routes = routes
  }
};

const actions = {
  getRoleRouter({commit}: ActionContext<any, any>) {
    return new Promise((resolve, reject) => {
      routerService.getRoleRouter().then(res => {
        const accessedRoutes = filterRoutes(res.data);
        commit('SET_ROUTES', accessedRoutes);
        resolve(accessedRoutes)
      }).catch(err => {
        reject(err)
      })
    })
  },
};

const getters = {
  routes: (state: any) => state.routes
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
