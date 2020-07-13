<template>
  <hy-dialog :visible.sync="dialogVisible" width="800px" :title="title" :before-close="closeDialog">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="路径" prop="path">
        <el-input v-model="formData.path"/>
      </el-form-item>
      <el-form-item label="路径名称" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="组件" prop="component">
        <el-select v-model="formData.component" filterable style="width:100%">
          <el-option v-for="item in componentList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form ref="formMeta" :model="formData.meta" :rules="rulesMeta" label-width="100px">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="formData.meta.title"/>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="formData.meta.icon"/>
        </el-form-item>
        <el-form-item label="是否固定" prop="affix">
          <el-switch v-model="formData.meta.affix"/>
        </el-form-item>
        <el-form-item label="是否无缓存" prop="noCache">
          <el-switch v-model="formData.meta.noCache"/>
        </el-form-item>
      </el-form>
      <el-form-item label="角色" prop="role">
        <el-checkbox :indeterminate="isIndeterminate" v-model="roleCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRoleChange">
          <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{role.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loding="loading">确认</el-button>
    </div>

  </hy-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import HyDialog from "@/components/HyDialog/HyDialog.vue";
import {addRouterMode, RouterModel} from "@/model/router.model";
import routerService from "@/api/routerService";
import permissionService from "@/api/permissionService";
import {elValidateAlphabetNumber} from "@/utils/validateEl";
import {RoleModel} from "@/model/permission.model";
import componentList from "@/constant/componentList"

class Router {
  id = undefined;
  path = '';
  name = '';
  component = '';
  meta = {
    title: '',
    icon: '',
    affix: false,
    noCache: false
  }
}

@Component({
  components: {HyDialog}
})
export default class MenuEditDialog extends Vue {
  loading: boolean = false;

  dialogVisible: boolean = false;
  title: string = '';

  parentId!: number | undefined;
  formData: RouterModel = new Router();

  componentList:string[] = componentList;

  rules: any = {
    path: [{required: true, message: '请填写路径', trigger: 'blur'}],
    name: [
      {required: true, message: '请填写路劲英文名', trigger: 'blur'},
      {validator: elValidateAlphabetNumber, trigger: 'blur'}
    ],
    component: [{required: true, message: '请填写组件', trigger: 'blur'}]
  };
  rulesMeta: any = {
    title: [{required: true, message: '请填写菜单标题', trigger: 'blur'}]
  };

  /**
   * 角色相关
   */
  roleList: RoleModel[] = [];

  roleCheckAll: boolean = false;
  checkedRoles: number[] = [];
  isIndeterminate: boolean = false;

  created() {
    this.getAllRole();
  };

  getAllRole() {
    permissionService.getAllRole().then(res => {
      this.roleList = res.data
    })
  };

  getPermissionRole() {
    permissionService.getRouterOnRoles(this.formData.id as number).then(res => {
      this.checkedRoles = res.data;
      this.handleCheckedRoleChange(this.checkedRoles);
    })
  };

  closeDialog() {
    this.parentId = undefined;
    this.formData = new Router();
    this.roleCheckAll = false;
    this.checkedRoles = [];
    this.isIndeterminate = false;
    this.dialogVisible = false;
  };

  openDialog({parent, data}: { parent: RouterModel, data: RouterModel }): void {
    if (parent) {
      this.parentId = parent.id;
      this.title = '添加菜单'
    } else {
      this.formData = data;
      this.title = '编辑菜单';
      this.getPermissionRole();
    }
    this.dialogVisible = true;
  };

  handleCheckAllChange(value: boolean) {
    this.checkedRoles = value ? this.roleList.map(e => e.id) : [];
    this.isIndeterminate = false;
  };

  handleCheckedRoleChange(value: number[]) {
    let checkedCount = value.length;
    this.roleCheckAll = checkedCount === this.roleList.length;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length
  };

  handleConfirm() {
    (this.$refs.form as any).validate((valid: boolean) => {
      (this.$refs.formMeta as any).validate((valid2: boolean) => {
        if (valid && valid2) {
          this.saveForm();
        }
      })
    });
  };

  saveForm() {
    //添加路由
    if (this.parentId) {
      const params: addRouterMode = {
        parentId: this.parentId, ...this.formData
      };
      this.loading = true;
      routerService.addRouter(params).then(res => {
        this.$hySuccess('添加成功');
        this.closeDialog();
        this.$emit('refresh')
      }).finally(() => {
        this.loading = false;
      })
    } else {
      //修改路由
      const params: RouterModel = {
        ...this.formData
      };
      this.loading = true;
      routerService.putRouter(params).then(res => {
        this.$hySuccess('修改成功');
        this.closeDialog();
        this.$emit('refresh')
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}

</script>

<style scoped lang='scss'>

</style>
