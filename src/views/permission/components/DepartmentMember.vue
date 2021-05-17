<template>
  <div>
    <hy-table v-loading="loading" :data="tableData">
      <el-table-column prop="id" label="id" width="100"/>

      <el-table-column prop="account" label="账号"/>
      <el-table-column prop="author" label="昵称"/>

      <el-table-column prop="roles" label="角色" :formatter="arrToString"/>
      <el-table-column prop="is_disabled" label="是否启用" header-align="left" align="center" width="100px">
        <template slot-scope="scope">
          <el-switch :value="scope.row.is_disabled" @change="handleChangeDisabled(scope.row)"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <hy-button type="success" :auto-confirm="true" @confirm="handleDelete(scope.row, $event)">删除</hy-button>
        </template>
      </el-table-column>
    </hy-table>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import permissionService from "@/api/permissionService";
import {HyTable} from "@/components/HyTable"
import HyButton from "@/components/HyButton/HyButton.vue";

@Component({
  components: {HyTable, HyButton}
})
export default class DepartmentMember extends Vue {
  loading: boolean = false;
  tableData: any = [];

  @Prop({required: true}) departmentId!: number;

  @Watch('departmentId')
  onMenuIdChange(value: number): void {
    if (value) {
      this.getData();
    }
  }

  getData() {
    this.loading = true;
    permissionService.getMemberOnDepartment(this.departmentId).then(res => {
      this.tableData = res.data;
    }).finally(() => {
      this.loading = false;
    })
  };

  handleEdit(){}
  handleDelete(){}
  handleChangeDisabled(){}

  arrToString(row: any, col: any, val: []) {
    return val && val.toString()
  }
}
</script>

<style scoped lang='scss'>

</style>
