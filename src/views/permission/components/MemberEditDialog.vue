<template>
  <div>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class MemberEditDialog extends Vue {
  @Prop()
  departmentId!: number
}
</script>

<style scoped lang='scss'>

</style>
