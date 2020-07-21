import {get} from "@/utils/request";
import {PageQuery} from "@/utils/page-query";
import {PageResponseModel, ResponseModel} from "@/model/response.model";
import {ButtonPermission, RoleDetailModel, RoleModel} from "@/model/permission.model";

const permissionService = {
  /**
   * 分页获取角色列表
   */
  getListRole(pageQuery: PageQuery): Promise<ResponseModel<PageResponseModel<RoleModel[]>>> {
    return get(`mock/permission/roleList`, pageQuery)
  },

  /**
   * 获取所有角色
   */
  getAllRole(): Promise<ResponseModel<RoleModel[]>> {
    return get(`mock/permission/roleAll`)
  },

  /**
   * 获取角色详情
   */
  getRoleDetail(id: number): Promise<ResponseModel<RoleDetailModel>> {
    return get(`mock/permission/roleDetail`, {id: id})
  },

  /**
   * 获取路由菜单对应的有权限的角色id
   */
  getRouterOnRoles(id: number): Promise<ResponseModel<number[]>> {
    return get(`mock/permission/routerOnRoles`, {id: id})
  },

  /**
   * 菜单id对应的按钮权限
   */
  getRouterOnButton(id: number): Promise<ResponseModel<ButtonPermission>> {
    return get(`mock/permission/routerOnButton`, {id: id})
  }
};

export default permissionService
