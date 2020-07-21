import {Component} from "vue-router/types/router";

export interface RouterModel {
  id:number;
  path:string;
  component:string|Component;
  meta:metaModel;
  name:string;
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
