<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu

      >

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import userService from "@/api/userService";

@Component

export default class sidebar extends Vue {

}
</script>

<style scoped lang='scss'>

</style>
