<template>
  <div class="form-search-bar">
    <el-input :placeholder="placeholder" clearable v-model="value" @change="handleChange" />
    <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class TableSearchBar extends Vue {
  @Prop({default: '请输入查询条件'})
  placeholder!: string;

  @Prop({required: true})
  value!: string;

  handleSearch(){
    this.$emit('handleSearch')
  };

  handleChange(value:string){
    this.$emit('input', value)
  }
}
</script>

<style scoped lang='scss'>
.form-search-bar{
  display: inline-block;
  .el-input{
    width: 200px;
  }
}
</style>
