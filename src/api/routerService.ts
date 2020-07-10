import {get} from "@/utils/request";
import {ResponseModel} from "@/model/response.model";
import {RouterModel} from "@/model/router.model";
import {RouteConfig} from "vue-router";

const routerService = {
  /**
   * 个人用户的菜单路由
   */
  getRoleRouter(): Promise<ResponseModel<RouteConfig[]>> {
    return get('mock/permission/routerList')
  },

  /**
   * 总的路由列表
   */
  getRouterList(): Promise<ResponseModel<RouteConfig[]>>{
    return get('mock/router/routerList')
  }
};

export default routerService
