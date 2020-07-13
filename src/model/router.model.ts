import {Component} from "vue-router/types/router";

export interface RouterModel {
  path:string;
  component:string|Component;
  meta:metaModel;
  name:string;
  id?:number;
  redirect?:string;
  children?:RouterModel[];
}

export interface metaModel {
  title:string;
  icon?:string;
  affix?:boolean;
  noCache?:boolean
}

export interface addRouterMode extends RouterModel{
  parentId:number
}
