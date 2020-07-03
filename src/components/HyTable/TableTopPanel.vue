<template>
  <div class="form-top-panel">
    <div>
      <slot name="left-panel" />
    </div>
    <div>
      <slot name="right-panel" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class TableTopPanel extends Vue {

}
</script>

<style scoped lang='scss'>
.form-top-panel{
  display: flex;
  justify-content: space-between;
  .el-button{
    margin-bottom: 10px;
    margin-left: 0;
    margin-right: 10px;
  }
}
</style>
