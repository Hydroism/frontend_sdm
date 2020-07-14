<template>
  <hy-dialog :visible.sync="dialogVisible" width="800px" :title="title">
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

@Component({
  components: {HyDialog}
})
export default class RoleEditDialog extends Vue {
  loading: boolean = false;
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

  created(){};

  getData() {
    this.loading = true;
    permissionService.getRoleDetail(this.id).then(res => {
      this.formData = res.data;
    }).finally(() => {
      this.loading = false;
    })
  };

  getAllRouters(){

  };

  openDialog(id: number): void {
    if (id) {
      this.title = '编辑角色';
      this.id = id;
      this.getData();
    } else {
      this.title = '添加角色'
    }
    this.dialogVisible = true;
  };

  closeDialog() {
    this.dialogVisible = false;
  };

  handleConfirm() {
  };

}
</script>

<style scoped lang='scss'>

</style>
