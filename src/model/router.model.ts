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
  routeId?:number;  //临时保存，用户请求该页面的按钮权限
  icon?:string;
  affix?:boolean;
  noCache?:boolean;
}

export interface addRouterMode extends RouterModel{
  parentId:number
}
