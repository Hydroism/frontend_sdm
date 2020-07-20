import {get} from "@/utils/request";
import {PageResponseModel, ResponseModel} from "@/model/response.model";
import {PageQuery} from "@/utils/page-query";
import {ViewsModel} from "@/model/views.model";

const viewsService = {
  /**
   * 获取视图列表
   */
  getListViews(pageQuery: PageQuery):Promise<ResponseModel<PageResponseModel<ViewsModel[]>>>{
    return get(`mock/views/viesList`, pageQuery)
  }
};

export default viewsService;
