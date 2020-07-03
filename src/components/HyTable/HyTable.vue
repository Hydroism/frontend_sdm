<template>
  <el-table v-bind="attrs" v-on="$listeners">
    <template slot-scope="scope">
      <slot v-bind:scope="scope"/>
    </template>
  </el-table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

const defaultAttrs = {
  border: true,
  fit: true
};

@Component
export default class HyTable extends Vue {
  get attrs() {
    return {...defaultAttrs, ...this.$attrs}
  }
}
</script>

<style scoped lang='scss'>
  .el-table {
    margin: 10px 0;
  }
</style>
