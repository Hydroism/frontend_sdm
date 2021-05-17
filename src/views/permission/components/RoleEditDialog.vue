<template>
  <hy-dialog :visible.sync="dialogVisible" width="1000px" :title="title">
    <el-form ref="form" :mdoel="formData" :rules="rules" label-width="100px" v-loading="loading">
      <el-form-item label="角色名">
        <el-input v-model="formData.roleName"/>
      </el-form-item>
      <el-form-item label="角色码">
        <el-input v-model="formData.roleCode"/>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="formData.description" type="textarea"/>
      </el-form-item>
      <el-form-item label="权限管理">

        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-tree
              ref="tree"
              :data="routeList"
              :expand-on-click-node="false"
              :highlight-current="true"
              node-key="id"
              default-expand-all
              show-checkbox
              :default-checked-keys="this.formData.routers"
              @node-click="checkoutMenu"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span class="tree-item">
                  <svg-icon v-if="data.meta && data.meta.icon" :icon-class="data.meta.icon"/>
                  {{ data.meta.title }}
                </span>
              </span>
            </el-tree>
          </el-col>

          <el-col :span="15">
            <hy-table v-loading="tableLoading" :data="tableData">
              <el-table-column prop="name" label="名称" width="200" align="center"/>

              <el-table-column prop="remarks" label="备注" align="center"/>

              <el-table-column prop="isEnable" label="是否有权限" align="center" min-width="100">
                <template slot-scope="scope">
                  <el-switch :value="isEnable(scope.row)" @change="switchChange($event, scope.row)"/>
                </template>
              </el-table-column>
            </hy-table>
          </el-col>

        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loding="submitLoading">确认</el-button>
    </div>

  </hy-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import HyDialog from "@/components/HyDialog/HyDialog.vue";
import {RoleDetailModel, RoleModel} from "@/model/permission.model";
import permissionService from "@/api/permissionService";
import {RouterModel} from "@/model/router.model";
import routerService from "@/api/routerService";
import {HyTable} from "@/components/HyTable";
import {addPermission, delPermission, hasPermission} from "@/utils/permission"
import {PermissionButtonItem} from "@/model/permission.model";
import {ElForm} from "element-ui/types/form";
import {ElTree} from "element-ui/types/tree";
import menusService from "@/api/menusService";

@Component({
  components: {HyDialog, HyTable}
})
export default class RoleEditDialog extends Vue {
  loading: boolean = false;
  tableLoading: boolean = false;
  submitLoading: boolean = false;

  dialogVisible: boolean = false;

  title: string = '';
  id!: number;

  formData: RoleDetailModel = {
    roleName: '',
    roleCode: '',
    description: '',
    routers: []
  };

  rules: any = {};

  /**
   * 菜单
   */
  routeList: RouterModel[] = [];
  tableData: any = [];

  //角色权限码
  rolePermission: string = "0,0,0,4,3,0";

  created() {
    this.getData();
  };

  get isEnable() {
    return (buttonItem: PermissionButtonItem): boolean => {
      return hasPermission(this.rolePermission, buttonItem);
    }
  }

  getData() {
    menusService.getMenusList().then((res:any) => {
      this.routeList = res.data;
    })
  };

  getRoleDetail() {
    this.loading = true;
    permissionService.getRoleDetail(this.id).then(res => {
      this.formData = res.data;
    }).finally(() => {
      this.loading = false;
    })
  };

  openDialog(id: number): void {
    if (id) {
      this.title = '编辑角色';
      this.id = id;
      this.getRoleDetail();
    } else {
      this.title = '添加角色'
    }
    this.dialogVisible = true;
  };

  closeDialog() {
    //清空树，避免再次打开的时候树的checked还在
    (this.$refs.tree as ElTree<any,any>).setCheckedKeys([]);
    (this.$refs['form'] as ElForm).resetFields();

    this.dialogVisible = false;
  };

  checkoutMenu(data: RouterModel) {
    this.tableLoading = true;
    permissionService.getRouterOnButton(data.id).then(res => {
      this.tableData = res.data.buttons;
    }).finally(() => {
      this.tableLoading = false;
    })
  }

  handleConfirm() {
    //todo 角色权限为空的用0表示
    console.log((this.$refs.tree as ElTree<any,any>).getCheckedKeys());
  };

  switchChange(value: boolean, buttonItem: PermissionButtonItem) {
    if (value) {
      this.rolePermission = addPermission(this.rolePermission, buttonItem)
    } else {
      this.rolePermission = delPermission(this.rolePermission, buttonItem)
    }
  }

}
</script>

<style scoped lang='scss'>

</style>
