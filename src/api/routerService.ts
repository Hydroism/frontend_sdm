import {del, get, post, put} from "@/utils/request";
import {ResponseModel} from "@/model/response.model";
import {addRouterMode, RouterModel} from "@/model/router.model";

const routerService = {
  /**
   * 个人用户的菜单路由
   */
  getRoleRouter(): Promise<ResponseModel<RouterModel[]>> {
    return get('mock/permission/routerList')
  },


  /**
   * 添加菜单路由
   */
  addRouter(params: addRouterMode): Promise<ResponseModel<any>> {
    return post('mock/router/addRouter', params)
  },

  /**
   * 修改菜单路由
   */
  putRouter(params: RouterModel): Promise<ResponseModel<any>> {
    return put('mock/router/editRouter', params)
  },

  /**
   * 删除菜单路由
   */
  delRouter(id:number): Promise<ResponseModel<any>> {
    return del(`mock/router/delRouter`, {id: id})
  },

  /**
   * 改变菜单路由顺序
   */
  postSortRouter(params: RouterModel[]):Promise<ResponseModel<any>>{
    return post(`mock/router/sortRouter`, params)
  }
};

export default routerService
