import {get} from "@/utils/request";
import {PageQuery} from "@/utils/page-query";
import {PageResponseModel, ResponseModel} from "@/model/response.model";
import {RoleModel} from "@/model/permission.model";

const permissionService = {
  getListRole(pageQuery: PageQuery): Promise<ResponseModel<PageResponseModel<RoleModel[]>>> {
    return get(`mock/permission/roleList`, pageQuery)
  },

  getAllRole(): Promise<ResponseModel<RoleModel[]>>{
    return get(`mock/permission/roleAll`)
  },

  getRoleDetail(id:number):Promise<ResponseModel<RoleModel>>{
    return get(`mock/permission/roleDetail`, {id:id})
  },

  getRouterOnRoles(id:number):Promise<ResponseModel<number[]>>{
    return get(`mock/permission/routerOnRoles`, {id:id})
  }
};

export default permissionService
