import {Route, RouteConfig} from "vue-router";
import {ActionContext} from "vuex";

const state = {
  visitedRoutes: [],
  cachedRoutes: [],
};

const mutations = {
  /**
   * tags标签
   */
  //添加标签
  ADD_VISITED_ROUTE(state: any, route: Route) {
    if (state.visitedRoutes.some((e: VisitedRoute) => e.path === route.path)) return;
    state.visitedRoutes.push({...route, title: route.meta.title || '新标签页'})
  },

  //关闭单个标签
  DEL_VISITED_ROUTE(state: any, route: Route) {
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

  /**
   * keep-alive缓存
   */
  ADD_CACHED_ROUTE(state: any, route: RouteConfig) {
    if (state.cachedRoutes.includes(route.name)) return;
    if (!route.meta.noCache) {
      state.cachedRoutes.push(route.name)
    }
  },
  DEL_CACHED_ROUTE(state: any, route: RouteConfig) {
    const index = state.cachedRoutes.indexOf(route.name)
    index > -1 && state.cachedRoutes.splice(index, 1)
  },
  DEL_OTHERS_CACHED_ROUTES(state: any, route: RouteConfig) {
    const index = state.cachedRoutes.indexOf(route.name)
    if (index > -1) {
      state.cachedRoutes = state.cachedRoutes.slice(index, index + 1)
    } else {
      state.cachedRoutes = []
    }
  },
  DEL_ALL_CACHED_ROUTES(state: any, route: RouteConfig) {
    state.cachedRoutes = []
  }
};

const actions = {
  /**
   * 标签和缓存同时
   * @param dispatch
   * @param route
   */
  addView({dispatch}: ActionContext<any, any>, route: Route) {
    dispatch('addVisitedRoute', route)
    dispatch('addCachedRoute', route);
  },
  delView({dispatch, state}: ActionContext<any, any>, route: Route) {
    return new Promise(resolve => {
      dispatch('delVisitedRoute', route)
      dispatch('delCachedRoute', route)
      resolve({
        visitedRoutes:[...state.visitedRoutes],
        cachedRoutes:[...state.cachedRoutes]
      })
    })
  },

  /**
   * tags标签
   * @param commit
   * @param route
   */
  addVisitedRoute({commit}: ActionContext<any, any>, route: Route) {
    commit('ADD_VISITED_ROUTE', route)
  },
  updateVisitedRoute({commit}: ActionContext<any, any>, route: Route) {
    commit('UPDATE_VISITED_ROUTES', route)
  },
  delVisitedRoute({commit, state}: ActionContext<any, any>, route: Route) {
    return new Promise(resolve => {
      commit('DEL_VISITED_ROUTE', route);
      resolve([...state.visitedRoutes])
    })
  },

  /**
   * keep-alive缓存
   * @param commit
   * @param route
   */
  addCachedRoute({commit}: ActionContext<any, any>, route: Route) {
    commit('ADD_CACHED_ROUTE', route)
  },
  delCachedRoute({commit, state}: ActionContext<any, any>, route: Route) {
    return new Promise(resolve => {
      commit('DEL_CACHED_ROUTE', route);
      resolve([...state.cachedRoutes])
    })
  },
  delOthersCachedRoutes({commit, state}: ActionContext<any, any>, route: Route) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_ROUTES', route)
      resolve([...state.cachedRoutes])
    })
  },
  delAllCachedRoutes({commit, state}: ActionContext<any, any>) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_ROUTES')
      resolve([...state.cachedRoutes])
    })
  }
};

const getters = {
  visitedRoutes: (state: any) => state.visitedRoutes,
  cachedRoutes: (state: any) => state.cachedRoutes
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
