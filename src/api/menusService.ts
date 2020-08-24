import {ResponseModel} from "@/model/response.model";
import {RouterModel} from "@/model/router.model";
import {get} from "@/utils/request";


const menusService = {
  /**
   * 所有的菜单路由列表
   */
  getMenusList(): Promise<ResponseModel<RouterModel[]>> {
    return get('api/v1.0/menus/list/')
  },
};

export default menusService
