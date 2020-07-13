<template>
  <div class="app-container">
    <table-top-panel>
      <template slot="left-panel">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加角色</el-button>
      </template>
      <template slot="right-panel">
        <table-search-bar v-model="searchInput" @handleSercha="getData"/>
      </template>
    </table-top-panel>

    <hy-table v-loading="dataLoading" :data="tableData">
      <el-table-column prop="roleName" label="角色名" width="200" align="center"/>
      <el-table-column prop="roleCode" label="角色码" width="200" align="center"/>
      <el-table-column prop="description" label="角色描述" :align="'left'"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="success" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </hy-table>

    <table-pagination v-model="pageQuery" @getData="getData"/>

    <role-edit-dialog ref="roleEditDialog"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {PageQuery} from "@/utils/page-query";
import permissionService from "@/api/permissionService";
import {HyTable, TableTopPanel, TableSearchBar, TablePagination} from "@/components/HyTable";
import RoleEditDialog from "./components/RoleEditDialog.vue";

@Component({
  components: {TableTopPanel, TableSearchBar, TablePagination, HyTable, RoleEditDialog}
})
export default class roleManagement extends Vue {
  searchInput: string = '';
  dataLoading: boolean = true;
  tableData: any = [];
  pageQuery: PageQuery = new PageQuery();

  created() {
    this.getData();
  };

  getData() {
    this.dataLoading = true;
    permissionService.getListRole(this.pageQuery).then(res => {
      this.pageQuery.covertResponses(res.data);
      this.tableData = res.data.results;
    }).finally(() => {
      this.dataLoading = false;
    })
  };

  handleAdd(id: number) {
    (this.$refs.roleEditDialog as any).openDialog(id);
  };

  handleEdit(id: number) {
    (this.$refs.roleEditDialog as any).openDialog(id);
  };

  handleDelete() {
    this.$hyConfirm('删除角色后不可撤回，确认？', () => {
      this.$hySuccess('删除成功')
    })
  };
}
</script>

<style scoped lang='scss'>

</style>
