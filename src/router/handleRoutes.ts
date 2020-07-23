import {RouteConfig} from "vue-router";
import store from '@/store'
import Layout from "@/layout/Layout.vue";
import {RouterModel} from "@/model/router.model";

function loadView(viewPath:string){
  return (resolve:any) => require([`@/views/${viewPath}`], resolve)
}

/**
 * @description 动态添加路由
 * @param constantRoutes
 * @returns {*}
 */
export function filterRoutes(constantRoutes: RouterModel[]) {
  return constantRoutes.filter((route) => {
    if (route.id) {
      route.meta.routeId = route.id
    }
    if (route.component) {
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component as string);
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

/**
 * 判断返回的路由，是否有permissions权限标识，有的话判断当前角色是否符合
 * 但计划是由后台筛选后返回，路由不再有permission权限，因此这里全部返回true
 * @param route
 */
function hasPermission(route: RouteConfig) {
  const permissions = store.getters['user/roles'];
  if (route.meta && route.meta.permissions) {
    return route.meta.permissions.includes(permissions);
  } else {
    return true;
  }
}

/**
 * 后台放回值，经过处理加入到左侧菜单栏路由
 * @param routes
 */
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
