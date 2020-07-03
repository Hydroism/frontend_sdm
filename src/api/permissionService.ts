import {get} from "@/utils/request";
import {PageQuery} from "@/utils/page-query";
import {PageResponseModel, ResponseModel} from "@/model/response.model";
import {RoleModel} from "@/model/permission.model";

const permissionService = {
  getListRole(pageQuery: PageQuery): Promise<ResponseModel<PageResponseModel<RoleModel>>> {
    return get(`mock/permission/roleList`, pageQuery)
  },

  getRoleDetail(id:number):Promise<ResponseModel<RoleModel>>{
    return get(`mock/permission/roleDetail`, {id:id})
  }
};

export default permissionService
