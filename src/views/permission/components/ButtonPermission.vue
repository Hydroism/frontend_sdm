<template>
  <div>
    <hy-table v-loading="loading" :data="tableData">
      <el-table-column prop="name" label="名称" width="200" align="center"/>

      <el-table-column prop="remarks" label="备注" align="center"/>

      <el-table-column prop="permissionRoles_display" label="权限角色" width="200" align="center"/>

      <el-table-column prop="isEnable" label="是否启用" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.isEnable ? '是' : '否' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="success" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </hy-table>

    <table-top-panel>
      <template slot="right-panel">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
      </template>
    </table-top-panel>

    <button-edit-dialog ref="buttonEditDialog"/>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {HyTable, TableTopPanel, TableSearchBar, TablePagination} from "@/components/HyTable";
import permissionService from "@/api/permissionService";
import ButtonEditDialog from "./ButtonEditDialog.vue";
import {PermissionButtonItem} from "@/model/permission.model";

@Component({
  components: {TableTopPanel, TableSearchBar, TablePagination, HyTable, ButtonEditDialog}
})
export default class ButtonPermission extends Vue {
  loading: boolean = false;
  tableData: any = [];

  @Prop({required: true}) menuId!: number;

  @Watch('menuId')
  onMenuIdChange(value: number): void {
    if (value) {
      this.getData();
    }
  }

  getData() {
    this.loading = true;
    permissionService.getRouterOnButton(this.menuId).then(res => {
      this.tableData = res.data.buttons;
    }).finally(() => {
      this.loading = false;
    })
  };

  handleAdd() {
    (this.$refs.buttonEditDialog as any).openDialog({menuId: this.menuId});
  };

  handleEdit(row: PermissionButtonItem) {
    (this.$refs.buttonEditDialog as any).openDialog({permissionButtonItem: Object.assign({}, row)});
  };

  handleDelete(row: PermissionButtonItem) {
    this.$hyConfirm(`删除${row.name}后无法撤回，确认？`, () => {
      this.$hySuccess(`删除${row.name}成功~`);
    })
  };

}
</script>

<style scoped lang='scss'>

</style>
