import {Route, RouteConfig} from "vue-router";
import {ActionContext} from "vuex";

const state = {
  visitedRoutes: [],
  cachedRoutes: [],
};

const mutations = {
  //添加标签
  ADD_VISITED_ROUTE(state: any, route: Route) {
    if (state.visitedRoutes.some((e: VisitedRoute) => e.path === route.path)) return;
    state.visitedRoutes.push({...route, title: route.meta.title || '新标签页'})
  },

  //关闭单个标签
  DEL_VISITED_ROUTE(state: any, route: RouteConfig) {
    for (const [i, v] of state.visitedRoutes.entries()) {
      if (v.path === route.path) {
        state.visitedRoutes.splice(i, 1);
        break
      }
    }
  },

  //关闭其它标签
  DEL_OTHERS_VISITED_ROUTES(state: any, route: RouteConfig) {
    state.visitedRoutes = state.visitedRoutes.filter((e: VisitedRoute) => {
      return e.meta.affix || e.path === route.path
    })
  },

  //更新标签(query参数变化了)
  UPDATE_VISITED_ROUTES: (state: any, view: Route) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },

  ADD_CACHED_ROUTE(state: any, route: RouteConfig) {
    if (state.cachedRoutes.includes(route.name)) return;
    if (!route.meta.noCache) {
      state.cachedRoutes.push(route.name)
    }
  }
};

const actions = {
  addVisitedRoute({commit}: ActionContext<any, any>, route: Route) {
    commit('ADD_VISITED_ROUTE', route)
  },
  updateVisitedRoute({commit}: ActionContext<any, any>, route: Route){
    commit('UPDATE_VISITED_ROUTES', route)
  },

  delVisitedRoute({commit}: ActionContext<any, any>, route: Route){
    commit('DEL_VISITED_ROUTE', route)
  }
};

const getters = {
  visitedRoutes: (state: any) => state.visitedRoutes
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}

export interface VisitedRoute extends Route {
  title: string;
}
