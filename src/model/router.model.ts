export interface RouterModel {
  path:string;
  component:string;
  name?:string;
  redirect?:string;
  meta?:metaModel;
  children?:RouterModel[];
}

export interface metaModel {
  title?:string;
  icon?:string;
  affix?:boolean;
  noCache?:boolean
}
