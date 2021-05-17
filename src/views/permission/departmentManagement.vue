<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-loading="loading">
        <el-divider content-position="left">部门树状图</el-divider>
        <el-tree
          :data="departmentList"
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
              <svg-icon v-if="data.icon" :icon-class="data.icon"/>
              {{ data.name }}
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
        <br/>
      </el-col>

      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-divider content-position="left">部门成员</el-divider>
        <department-member :departmentId="currentDepartmentId"/>
        <br/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import DepartmentMember from "@/views/permission/components/DepartmentMember.vue";
import permissionService from "@/api/permissionService";

@Component({
  components: {DepartmentMember}
})
export default class departmentManagement extends Vue {
  loading: boolean = false;
  departmentList:any[]=[]

  currentDepartmentId: number = 0

  created(){
    this.getData()
  }

  getData(){
    permissionService.getDepartmentList().then( res => {
      this.departmentList = res.data
    })
  }

  handleDragEnd(draggingNode: any, dropNode: any, dropType: any, ev: any) {
    this.$hySuccess('调序成功~');
  };

  checkoutMenu(data: any) {
    this.currentDepartmentId = data.id;
  };

  append(node: any, data: any) {

  }

  edit(node: any, data: any) {

  }

  remove(node: any, data: any) {

  }
}
</script>

<style scoped lang='scss'>
  .tree-btn {
    margin: 0 2px;
  }
</style>
