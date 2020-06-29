<template>
  <div class="hamburger" @click="handleCollapse">
    <i class="fold-unfold"
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
  .hamburger {
    display: inline-block;
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    padding: 0 15px;
    font-size: 20px;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
</style>
