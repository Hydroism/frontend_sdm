<template>
  <el-table-column v-bind="attrs" v-on="$listeners">
    <slot/>
  </el-table-column>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

const defaultAttrs = {
  align: 'center'
};

@Component
export default class HyTableColumn extends Vue {
  get attrs() {
    return {...defaultAttrs, ...this.$attrs}
  }
}
</script>

<style scoped lang='scss'>

</style>
