<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'fullscreen-shrink':'fullscreen-expand'" @click="click" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import screenfull from 'screenfull'

@Component
export default class Screenfull extends Vue {
  isFullscreen:boolean=false;

  mounted(){
    this.init()
  };

  beforeDestroy(){
    this.destroy()
  };

  click(){
    if (!screenfull.isEnabled) {
      this.$hyError('您的浏览器不支持全屏模式');
      return false
    }
    screenfull.toggle()
  };
  change() {
    this.isFullscreen = (screenfull as any).isFullscreen
  };
  init() {
    if (screenfull.isEnabled) {
      screenfull.on('change', this.change)
    }
  };
  destroy() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.change)
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
