<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

export default class AppMain extends Vue {

}

</script>

<style scoped lang='scss'>
  .app-main {
    min-height: calc(100vh - #{$base-nav-bar-height});
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .hasTagsView {
    .app-main {
      min-height: calc(100vh - #{$base-nav-bar-height} - #{$base-tags-bar-height});
    }

    .fixed-header+.app-main {
      padding-top: 84px;
    }
  }
</style>
