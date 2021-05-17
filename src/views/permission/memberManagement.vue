<template>
  <div class="app-container">
    <table-top-panel>
      <template slot="left-panel">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加用户</el-button>
      </template>
      <template slot="right-panel">
        <table-search-bar v-model="searchInput" @handleSercha="getData"/>
      </template>
    </table-top-panel>

    <hy-table v-loading="loading" :data="tableData">
      <el-table-column prop="id" label="id" width="100px"/>
      <el-table-column prop="avatar" label="头像" header-align="left" align="center" width="100px">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" lazy style="width:50px;height: 50px;border-radius: 50px"/>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号"/>
      <el-table-column prop="author" label="昵称"/>
      <el-table-column prop="roles" label="角色" :formatter="arrToString" />
      <el-table-column prop="departments" label="部门" :formatter="arrToString"/>
      <el-table-column prop="creator" label="创建人"/>
      <el-table-column prop="create_time" label="创建时间"/>
      <el-table-column prop="remarks" label="备注"/>
      <el-table-column prop="is_disabled" label="是否启用" header-align="left" align="center" width="100px">
        <template slot-scope="scope">
          <el-switch :value="scope.row.is_disabled" @change="handleChangeDisabled(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="145">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="success" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </hy-table>

    <table-pagination v-model="pageQuery" @getData="getData"/>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {PageQuery} from "@/utils/page-query";
import {HyTable, TableTopPanel, TableSearchBar, TablePagination} from "@/components/HyTable"
import permissionService from "@/api/permissionService";

@Component({
  components: {HyTable, TableTopPanel, TableSearchBar, TablePagination}
})
export default class memberManagement extends Vue {
  loading: boolean = true
  pageQuery: PageQuery = new PageQuery();
  tableData: any[] = []
  searchInput: string = ''

  created() {
    this.getData()
  }

  getData() {
    this.loading = true;
    permissionService.getListMembers(this.pageQuery).then(res => {
      this.pageQuery.covertResponses(res.data);
      this.tableData = res.data.results;
    }).finally(() => {
      this.loading = false;
    })
  }

  handleChangeDisabled(row:any){
    row.is_disabled = !row.is_disabled
    //请求
  }

  handleAdd() {
  }

  handleEdit() {
  }

  handleDelete() {
  }

  arrToString(row:any, col:any, val:[]){
    return val && val.toString()
  }

}
</script>

<style scoped lang='scss'>

</style>
