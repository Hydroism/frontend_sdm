<template>
  <div class="app-container">
    <el-alert title="请在开发人员的指导下谨慎修改~如随意修改可能造成页面无法显示或显示错误等问题~" type="warning" show-icon :closable="false" />

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-loading="loading">
        <el-divider content-position="left">菜单树状图</el-divider>
        <el-tree
          ref="demoTree"
          class="filter-tree"
          :data="routeList"
          :expand-on-click-node="false"
          :highlight-current="true"
          node-key="id"
          draggable
          default-expand-all
          @node-drag-end="handleDragEnd"
          @node-click="checkoutMenu"
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
        <br />
      </el-col>

      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-divider content-position="left">页面功能权限控制列表</el-divider>
        <button-permission :menuId="currentMenuId" />
        <br />
      </el-col>
    </el-row>

    <menu-edit-dialog ref="menuEditDialog"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import MenuEditDialog from "./components/MenuEditDialog.vue";
import ButtonPermission from "./components/ButtonPermission.vue";
import routerService from "@/api/routerService";
import {RouterModel} from "@/model/router.model";
import {cloneDeep} from "lodash"

@Component({
  components: {MenuEditDialog, ButtonPermission}
})
export default class menuManagement extends Vue {
  loading: boolean = false;
  routeList: RouterModel[] = [];

  currentMenuId:number = 0;

  created() {
    this.getData();
  };

  getData(): void {
    routerService.getRouterList().then(res => {
      this.routeList = res.data;
    })
  };

  handleDragEnd(draggingNode: any, dropNode: any, dropType: any, ev: any) {
    this.loading = true;
    routerService.postSortRouter(this.routeList).then(res => {
      this.$hySuccess('调序成功~');
      // this.getData();
    }).finally(() => {
      this.loading = false
    })
  };

  checkoutMenu(data:RouterModel){
    this.currentMenuId = data.id;
  };

  append(node: any, data: any): void {
    (this.$refs.menuEditDialog as any).openDialog({parentId: data.id});
  };

  edit(node: any, data: RouterModel): void {
    (this.$refs.menuEditDialog as any).openDialog({data: cloneDeep(data)});
  };

  remove(node: any, data: RouterModel): void {
    this.$hyConfirm(`删除${data.meta.title}后无法撤回，确认？`, () => {
      routerService.delRouter(data.id as number).then(res => {
        this.$hySuccess(`删除${data.meta.title}成功~`);
        this.getData();
      })
    })
  };
}
</script>

<style scoped lang='scss'>
  .tree-btn {
    margin: 0 2px;
  }
</style>
