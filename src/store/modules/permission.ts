import {ActionContext, Commit} from "vuex";
import {RouteConfig} from "vue-router";
import routerService from "@/api/routerService";
import {filterAsyncRoutes, filterRoutes} from "@/router/handleRoutes";
import {PermissionButtonItem} from "@/model/permission.model";
import permissionService from "@/api/permissionService";

const state = {
  routes: [],
  permissionButton: [],
};

const mutations = {
  SET_ROUTES: (state: any, routes: RouteConfig[]) => {
    state.routes = routes
  },
  SET_PERMISSION_BUTTON: (state: any, {menuId, permissionButton}: { menuId: number, permissionButton: { [key: string]: string } }) => {
    state.permissionButton[menuId] = permissionButton
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

  setPermissionButtons({commit}: ActionContext<any, any>, menuId: number) {
    return new Promise((resolve, reject) => {
      permissionService.getMenuOnPermissionButtons(menuId).then(res => {
        const buttons = res.data.buttons;
        let permissionButton: { [key: string]: string } = {};
        buttons.forEach(e => {
          permissionButton[e.name] = e.permissionCode
        });
        commit('SET_PERMISSION_BUTTON', {menuId: menuId, permissionButton: permissionButton});
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
};

const getters = {
  routes: (state: any) => state.routes,
  permissionButton: (state: any) => {
    return function (menuId: number) {
      return state.permissionButton[menuId]
    }
  }
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
