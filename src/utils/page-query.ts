/**
 *分页参数的封装
 */
import {PageResponseModel} from "@/model/response.model";

export class PageQuery {
  page: number = 1;
  page_size: number = 10;
  count: number = 0;

  constructor(page_size: number = 10) {
    this.page_size = page_size;
  }

  covertResponses(data: PageResponseModel<any>) {
    this.page++;
    this.count = data.count;
  }

  reset() {
    this.page = 0;
    this.count = 0;
  }

  isLast(): boolean {
    return this.count / this.page_size < this.page - 1
  }
}

