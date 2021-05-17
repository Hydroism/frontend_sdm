<template>
  <hy-dialog :visible.sync="dialogVisible" width="800px" :title="title">
    <el-form ref="form" :mdoel="formData" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>

      <el-form-item label="是否启用" prop="isEnable">
        <el-switch v-model="formData.isEnable"/>
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        <el-input v-model="formData.remarks" type="textarea"/>
      </el-form-item>

      <el-form-item label="权限角色" prop="permissionRoles">
        <el-checkbox :indeterminate="isIndeterminate" v-model="roleCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="formData.permissionRoles" @change="handleCheckedRoleChange">
          <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{role.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loding="submitLoading">确认</el-button>
    </div>

  </hy-dialog>
</template>

<script lang="ts">
import {Component, Inject, InjectReactive, Prop, Vue} from "vue-property-decorator"
import HyDialog from "@/components/HyDialog/HyDialog.vue";
import permissionService from "@/api/permissionService";
import {RoleModel} from "@/model/permission.model";
import {ElForm} from "element-ui/types/form";

class PermissionButtonItem {
  name: string = '';
  remarks: string = '';
  isEnable: boolean = true;
  permissionRoles: number[] = [];
}

@Component({
  components: {HyDialog}
})
export default class ButtonEditDialog extends Vue {
  dialogVisible: boolean = false;
  title: string = '';

  /**
   * 表单
   */
  submitLoading: boolean = false;
  menuId!: number;
  id!: number;
  formData: PermissionButtonItem = new PermissionButtonItem();
  rules: any = {};

  /**
   * 角色相关
   */
  @InjectReactive('allRoleList') roleList!: RoleModel[];
  roleCheckAll: boolean = false;
  isIndeterminate: boolean = false;

  openDialog({menuId, permissionButtonItem}: { menuId: number, permissionButtonItem: PermissionButtonItem }): void {
    //初始化表单
    this.formData = new PermissionButtonItem();

    if (permissionButtonItem) {
      this.formData = permissionButtonItem;
      this.handleCheckedRoleChange(this.formData.permissionRoles);
      this.title = '编辑页面功能权限';
    } else {
      this.menuId = menuId;
      this.handleCheckedRoleChange([]);
      this.title = '添加页面功能权限'
    }
    this.dialogVisible = true;
  };

  closeDialog() {
    (this.$refs['form'] as ElForm).resetFields();
    this.dialogVisible = false;
  };

  handleCheckAllChange(value: boolean) {
    this.formData.permissionRoles = value ? this.roleList.map(e => e.id) : [];
    this.isIndeterminate = false;
  };

  handleCheckedRoleChange(value: number[]) {
    let checkedCount = value.length;
    this.roleCheckAll = checkedCount === this.roleList.length;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length
  };

  handleConfirm() {
  };
}
</script>

<style scoped lang='scss'>

</style>
