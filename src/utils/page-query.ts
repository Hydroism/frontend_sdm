/**
 *分页参数的封装
 */
export class PageQuery {
  page: number = 0;
  page_size: number = 10;
  count: number = 0;

  constructor(page_size:number = 10) {
    this.page_size = page_size;
  }

  covertResponses(data: any) {
    this.page ++;
    this.count = data.count;
  }

  reset() {
    this.page = 0;
    this.count = 0;
  }
}

class PageResponse {
  count: number = 0;
}
