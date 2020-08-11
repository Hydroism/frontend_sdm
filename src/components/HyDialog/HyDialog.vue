<template>
  <el-dialog v-bind="attrs" v-on="$listeners">
    <slot/>
    <template slot="footer">
      <slot name="footer"/>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

const defaultAttrs = {
  'close-on-click-modal': false
};
@Component
export default class HyDialog extends Vue {
  get attrs() {
    return {...defaultAttrs, ...this.$attrs}
  }
}
</script>

<style scoped lang='scss'>
  ::v-deep .el-dialog__body {
    overflow: hidden;
  }

</style>
