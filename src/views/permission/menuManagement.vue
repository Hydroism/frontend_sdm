<template>
  <div class="app-container">
    <table-top-panel>
      <template slot="left-panel">
        <el-button type="primary" size="small">测试东西</el-button>
        <el-button type="primary" size="small">测试东西</el-button>
        <el-button type="primary" size="small">测试东西</el-button>
      </template>
      <template slot="right-panel">
        <el-button type="success" size="small">测试东西</el-button>
        <el-button type="success" size="small">测试东西</el-button>
        <el-button type="success" size="small">测试东西</el-button>
        <el-button type="success" size="small">测试东西</el-button>
        <table-search-bar v-model="value" @handleSercha="queryData"/>
      </template>
    </table-top-panel>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-tree
          ref="demoTree"
          class="filter-tree"
          :data="routeList"
          :expand-on-click-node="false"
          :highlight-current="true"
          node-key="id"
          @node-click="nodeClick"
          @node-collapse="nodeCollapse"
          @node-expand="nodeExpand"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span class="tree-item">
              <svg-icon v-if="data.meta && data.meta.icon" :icon-class="data.meta.icon"/>
              {{ data.meta.title }}
            </span>
            <span class="tree-options">
              <a class="tree-btn"
                 title="添加"
                 @click="() => append(node, data)">
                <i class="el-icon-plus"/>
               </a>
              <a class="tree-btn"
                 title="编辑"
                 @click="() => edit(node, data)">
                <i class="el-icon-edit"/>
              </a>
              <a v-if="node.childNodes.length === 0"
                 class="tree-btn"
                 title="刪除"
                 @click="() => remove(node, data)">
                <i class="el-icon-delete"/>
              </a>
            </span>
          </span>
        </el-tree>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <json-editor :value="routeList" @changed="changeRoute"/>
      </el-col>
    </el-row>

    <menu-edit-dialog ref="menuEditDialog"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {TableTopPanel, TableSearchBar, TablePagination} from "@/components/HyTable";
import JsonEditor from "@/components/JsonEditor/JsonEditor.vue";
import MenuEditDialog from "./components/MenuEditDialog.vue";
import routerService from "@/api/routerService";
import {RouteConfig} from "vue-router";
import {RouterModel} from "@/model/router.model";

@Component({
  components: {TableTopPanel, TableSearchBar, TablePagination, JsonEditor, MenuEditDialog}
})
export default class menuManagement extends Vue {
  value: string = '';
  routeList: RouteConfig[] = [];

  queryData() {
  };

  created() {
    this.getData();
  };

  getData(): void {
    routerService.getRouterList().then(res => {
      this.routeList = res.data;
    })
  };

  changeRoute(e: string): void {
    try {
      this.routeList = JSON.parse(e)
    } catch (e) {

    }
  };


  nodeClick() {
  };

  nodeCollapse() {
  };

  nodeExpand() {
  };

  append(node: any, data: any) {
    console.log(node, data);
  };

  edit(node: any, data: RouterModel) {
    (this.$refs.menuEditDialog as any).openDialog(data);
  };

  remove() {
  };
}
</script>

<style scoped lang='scss'>
  .tree-btn {
    margin: 0 2px;
  }
</style>
