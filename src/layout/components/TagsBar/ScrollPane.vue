<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container">
    <slot/>
  </el-scrollbar>
</template>

<script lang="ts">
/**
 * 暂时没有用
 */


import {Component, Prop, Vue} from "vue-property-decorator"
import {Route} from "vue-router";

const tagAndTagSpacing = 4; // tagAndTagSpacing

@Component
export default class ScrollPane extends Vue {
  left: number = 0;

  mounted() {
    this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
  };

  beforeDestroy() {
    this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
  };

  get scrollWrapper() {
    //@ts-ignore
    return this.$refs.scrollContainer.$refs.wrap
  };

  emitScroll() {

  };

  //todo 过长后的scroll以后再搞，现在数据太少
  moveToTarget(currentTag: Route) {
    //@ts-ignore
    const $container: HTMLElement = this.$refs.scrollContainer.$el;
    const $containerWidth: number = $container.offsetWidth;
    const $scrollWrapper: HTMLElement = this.scrollWrapper;
    const tagList: any = this.$parent.$refs.tag;

    let firstTag = null;
    let lastTag = null;

    // find first tag and last tag
    if (tagList.length > 0) {
      firstTag = tagList[0];
      lastTag = tagList[tagList.length - 1]
    }

    if (firstTag === currentTag) {
      $scrollWrapper.scrollLeft = 0
    } else if (lastTag === currentTag) {
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
    } else {
      // find preTag and nextTag
      const currentIndex = tagList.findIndex((item: Route) => item === currentTag);
      const prevTag = tagList[currentIndex - 1];
      const nextTag = tagList[currentIndex + 1];

      // the tag's offsetLeft after of nextTag
      const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

      // the tag's offsetLeft before of prevTag
      const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

      if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
        $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
      } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
        $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
      }
    }
  }


}
</script>

<style scoped lang='scss'>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
</style>
