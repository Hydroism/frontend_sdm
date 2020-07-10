import {Component} from "vue-router/types/router";

export interface RouterModel {
  path:string;
  component:string|Component;
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
