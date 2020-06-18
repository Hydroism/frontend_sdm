import {RouteConfig} from "vue-router";
import store from '@/store'

/**
 * @description 动态渲染渲染路由，暂时没用
 * @param constantRoutes
 * @returns {*}
 */
export function filterRoutes(constantRoutes: RouteConfig[]) {
  return constantRoutes.filter((route) => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = (resolve) => require(["@/layout/Layout.vue"], resolve);
      } else if (route.component === "EmptyLayout") {
        route.component = (resolve) =>
          require(["@/layout/EmptyLayout"], resolve);
      } else {
        const path = "views/" + route.component;
        route.component = (resolve) => require([`@/${path}`], resolve);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterRoutes(route.children);
    }
    if (route.children && route.children.length === 0) {
      delete route.children;
    }
    return true;
  });
}

function hasPermission(route: RouteConfig) {
  console.log(store);
  const permissions = store.getters['user/role'];
  if (route.meta && route.meta.permissions) {
    return route.meta.permissions.includes(permissions);
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes: RouteConfig[]) {
  const res: RouteConfig[] = [];
  routes.forEach((route) => {
    const tmp = {...route};
    if (hasPermission(tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children);
      }
      res.push(tmp);
    }
  });
  return res;
}
