<template>
  <hy-dialog :visible.sync="dialogVisible" width="800px" :title="title">
    <el-form ref="form" :mdoel="formData" :rules="rules" label-width="100px">
      <el-form-item label="路径">
        <el-input v-model="formData.path"/>
      </el-form-item>
      <el-form-item label="路径名(英文)">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="组件">
        <el-input v-model="formData.component"/>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="formData.meta.title"/>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="formData.meta.icon"/>
      </el-form-item>
      <el-form-item label="是否固定">
        <el-switch v-model="formData.meta.affix"/>
      </el-form-item>
      <el-form-item label="是否无缓存">
        <el-switch v-model="formData.meta.noCache"/>
      </el-form-item>
    </el-form>
  </hy-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import HyDialog from "@/components/HyDialog/HyDialog.vue";
import {RouterModel} from "@/model/router.model";

@Component({
  components: {HyDialog}
})
export default class MenuEditDialog extends Vue {
  dialogVisible: boolean = false;
  title!: string;

  formData!: RouterModel;

  openDialog(router: RouterModel) {
    if (router) {
      this.formData = router;
      this.title = '编辑菜单';
    } else {
      this.title = '添加菜单'
    }
    this.dialogVisible = true;
  };
}

</script>

<style scoped lang='scss'>

</style>
