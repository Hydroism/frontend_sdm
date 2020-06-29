import {get, post} from "@/utils/request";
import {loginFormDataModel, UserInfoModel} from "@/model/user.model";

const userService = {
  postLogin(params:loginFormDataModel):Promise<any>{
    return post(`mock/user/login`, params)
  },

  getUserInfo():Promise<any>{
    return get(`mock/user/userInfo`)
  }
};

export default userService
