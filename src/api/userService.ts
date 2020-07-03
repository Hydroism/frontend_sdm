import {get, post} from "@/utils/request";
import {loginFormDataModel, UserInfoModel} from "@/model/user.model";
import {ResponseModel} from "@/model/response.model";

const userService = {
  postLogin(params:loginFormDataModel):Promise<ResponseModel<any>>{
    return post(`mock/user/login`, params)
  },

  getUserInfo():Promise<ResponseModel<UserInfoModel>>{
    return get(`mock/user/userInfo`)
  }
};

export default userService
