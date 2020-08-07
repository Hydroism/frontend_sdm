<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners"/>
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {isExternal} from "@/utils/validate";

/**
 * 需要添加新的svg矢量图，可通过www.iconfont.cn里面下载
 * 将svg图片添加到src/plugins/icons/svg目录中即可
 * https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=19238
 */

@Component
export default class SvgIcon extends Vue {
  @Prop({required: true})
  iconClass!: string;

  @Prop()
  className: string | undefined;

  get isExternal(): boolean {
    return isExternal(this.iconClass)
  };

  get iconName(): string {
    return `#icon-${this.iconClass}`
  };

  get svgClass(): string {
    if (this.className) {
      return 'svg-icon ' + this.className
    } else{
      return 'svg-icon'
    }
  };

  get styleExternalIcon():object{
    return {
      mask: `url(${this.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
    }
  }
}
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover!important;
    display: inline-block;
  }
</style>
