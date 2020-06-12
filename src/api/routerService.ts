import {get} from "@/utils/request";

const routerService = {
  getRoleRouter() {
    return get('mock/router/routerList')
  }
};

export default routerService
