<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {RouteRecord} from "vue-router/types/router";

@Component
export default class Breadcrumb extends Vue {
  levelList:RouteRecord[] = [];

  @Watch('$route',{immediate:true})
  onRouteChange():void{
    this.getBreadcrumb();
  }

  getBreadcrumb():void{
    let matched = this.$route.matched.filter(e => e.meta && e.meta.title);
    this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
  }

}
</script>

<style scoped lang='scss'>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
  }
</style>
