export interface ResponseModel<TContent> {
  code: number;
  data: TContent;
  msg: string;
}

export interface PageResponseModel<TItem> {
  count: number;
  results: TItem;
}
