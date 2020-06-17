<template>
  <div>
    <i class="fold-unfold"
       @click="handleCollapse"
       :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
       :title="isCollapse ? '展开' : '收起'"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {namespace} from "vuex-class";

const appModule = namespace('app');

@Component
export default class Hamburger extends Vue {
  @appModule.Getter('isCollapse') isCollapse!: boolean;

  handleCollapse() {
    this.$store.dispatch("app/toggleSidebar")
  }
}
</script>

<style scoped lang='scss'>

</style>
