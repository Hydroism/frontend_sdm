import {get, post} from "@/utils/request";
import {loginFormDataModel, UserInfoModel} from "@/model/user.model";
import {ResponseModel} from "@/model/response.model";

const userService = {
  /**
   * 账号密码登陆
   */
  postLogin(params:loginFormDataModel):Promise<ResponseModel<UserInfoModel>>{
    return post(`mock/user/login`, params)
  },

  /**
   * token获取用户信息
   */
  getUserInfo():Promise<ResponseModel<UserInfoModel>>{
    return get(`mock/user/userInfo`)
  }
};

export default userService
