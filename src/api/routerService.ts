import {get} from "@/utils/request";
import {ResponseModel} from "@/model/response.model";
import {RouterModel} from "@/model/router.model";

const routerService = {
  getRoleRouter(): Promise<ResponseModel<RouterModel[]>> {
    return get('mock/router/routerList')
  }
};

export default routerService
