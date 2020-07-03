<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :current-page="value.page"
    :page-size="value.page_size"
    :total="value.count"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {PageQuery} from "@/utils/page-query";

@Component
export default class TablePagination extends Vue {
  @Prop({required: true})
  value!: PageQuery;

  handleSizeChange(val: number) {
    this.$emit('input', {...this.value, page_size: val})
  };

  handleCurrentChange(val: number) {
    this.$emit('input', {...this.value, page: val})
  };
}
</script>

<style scoped lang='scss'>
.el-pagination{
  margin: 10px 0;
}
</style>
