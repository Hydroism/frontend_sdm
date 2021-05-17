<template>
  <hy-dialog :visible.sync="dialogVisible" width="800px" :title="title" :before-close="closeDialog">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="路径" prop="path">
        <el-input v-model="formData.path"/>
      </el-form-item>
      <el-form-item label="路径名称" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="视图" prop="component">
        <el-select v-model="formData.component" filterable style="width:100%" v-if="isNew">
          <el-option v-for="item in componentList" :key="item" :label="item" :value="item"/>
        </el-select>
        <span v-else>{{ formData.component }}</span>
      </el-form-item>
      <el-form ref="formMeta" :model="formData.meta" :rules="rulesMeta" label-width="100px">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="formData.meta.title"/>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <svg-icon v-if="formData.meta.icon" :icon-class="formData.meta.icon" style="margin-right:15px"/>
          <el-button @click="openSvgDialog">更换图标</el-button>
          <!--          <el-input v-model="formData.meta.icon"/>-->
        </el-form-item>
        <el-form-item label="是否固定" prop="affix">
          <el-switch v-model="formData.meta.affix"/>
        </el-form-item>
        <el-form-item label="是否无缓存" prop="noCache">
          <el-switch v-model="formData.meta.noCache"/>
        </el-form-item>
      </el-form>
      <el-form-item label="权限角色" prop="role">
        <el-checkbox :indeterminate="isIndeterminate" v-model="roleCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRoleChange">
          <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{role.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loding="submitLoading">确认</el-button>
    </div>

    <SvgSelectionDialog ref="svgSelectionDialog" @handleSelect="handleSelectIcon"/>

  </hy-dialog>
</template>

<script lang="ts">
import {Component, InjectReactive, Vue} from "vue-property-decorator"
import HyDialog from "@/components/HyDialog/HyDialog.vue";
import {addRouterMode, RouterModel} from "@/model/router.model";
import routerService from "@/api/routerService";
import permissionService from "@/api/permissionService";
import {elValidateAlphabetNumber} from "@/utils/validateEl";
import {RoleModel} from "@/model/permission.model";
import COMPONENT_LIST from "@/constant/componentList"
import SvgSelectionDialog from "@/components/SvgIcon/SvgSelectionDialog.vue";
import {ElForm} from "element-ui/types/form";

class Router {
  id = 0;
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
  components: {HyDialog, SvgSelectionDialog}
})
export default class MenuEditDialog extends Vue {
  dialogVisible: boolean = false;
  title: string = '';

  /**
   * 表单
   */
  submitLoading: boolean = false;

  parentId: number = 0;
  componentList: string[] = COMPONENT_LIST;

  formData: RouterModel = new Router();
  rules: any = {
    path: [{required: true, message: '请填写路径', trigger: 'blur'}],
    name: [
      {required: true, message: '请填写路径英文名', trigger: 'blur'},
      {validator: elValidateAlphabetNumber, trigger: 'blur'}
    ],
    component: [{required: true, message: '请填写视图', trigger: 'blur'}]
  };
  rulesMeta: any = {
    title: [{required: true, message: '请填写菜单标题', trigger: 'blur'}]
  };

  /**
   * 角色相关
   */
  @InjectReactive('allRoleList') roleList!:RoleModel[];
  roleCheckAll: boolean = false;
  checkedRoles: number[] = [];
  isIndeterminate: boolean = false;

  get isNew(): boolean {
    return !!this.parentId
  };

  getPermissionRole() {
    permissionService.getRouterOnRoles(this.formData.id as number).then(res => {
      this.checkedRoles = res.data;
      this.handleCheckedRoleChange(this.checkedRoles);
    })
  };

  openDialog({parentId, data}: { parentId: number, data: RouterModel }): void {
    //初始化所有数据
    this.parentId = 0;
    this.formData = new Router();
    this.roleCheckAll = false;
    this.checkedRoles = [];
    this.isIndeterminate = false;

    if (parentId) {
      this.parentId = parentId;
      this.title = '添加菜单'
    } else {
      this.formData = data;
      this.title = '编辑菜单';
      this.getPermissionRole();
    }
    this.dialogVisible = true;
  };

  closeDialog() {
    (this.$refs['form'] as ElForm).resetFields();
    (this.$refs['formMeta'] as ElForm).resetFields();
    this.dialogVisible = false;
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

  openSvgDialog() {
    (this.$refs.svgSelectionDialog as any).openDialog(this.formData.meta.icon);
  };

  handleSelectIcon({icon}: { icon: string }) {
    this.$set(this.formData.meta, 'icon', icon)
  }

  handleConfirm() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      (this.$refs.formMeta as ElForm).validate((valid2: boolean) => {
        if (valid && valid2) {
          this.saveForm();
        }
      })
    });
  };

  saveForm() {
    if (this.parentId) {
      //添加路由
      const params: addRouterMode = {
        parentId: this.parentId, ...this.formData
      };
      this.submitLoading = true;
      routerService.addRouter(params).then(res => {
        this.$hySuccess('添加成功');
        this.closeDialog();
        this.$emit('refresh')
      }).finally(() => {
        this.submitLoading = false;
      })
    } else {
      //修改路由
      const params: RouterModel = {
        ...this.formData
      };
      this.submitLoading = true;
      routerService.putRouter(params).then(res => {
        this.$hySuccess('修改成功');
        this.closeDialog();
        this.$emit('refresh')
      }).finally(() => {
        this.submitLoading = false;
      })
    }
  }
}

</script>

<style scoped lang='scss'>

</style>
