<template>
  <el-dialog v-bind="attrs" v-on="$listeners">
    <slot />
  </el-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

const defaultAttrs = {
};
@Component
export default class HyDialog extends Vue {
  get attrs() {
    return {...defaultAttrs, ...this.$attrs}
  }
}
</script>

<style scoped lang='scss'>

</style>
