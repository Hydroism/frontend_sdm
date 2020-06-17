<template>
  <div>
    <svg-icon v-if="icon" :icon-class="icon"/>
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {CreateElement} from "vue/types/vue";
import {RenderContext} from "vue/types/options";
import {VNode} from "vue/types/vnode";

@Component({
  name:'MenuItem'
})
export default class Item extends Vue {
  @Prop({default:''}) icon!:string;
  @Prop({default:''}) title!:string;

  // render(h:CreateElement, context:RenderContext<any>): any[]{
  //   console.log(h, context);
  //   const {icon, title} = context.props;
  //   const vnodes = [];
  //
  //   if (icon) {
  //     vnodes.push(`<svg-icon icon-class=${icon} />`)
  //   }
  //
  //   if (title) {
  //     vnodes.push(`<span slot='title'>${title}</span>`)
  //   }
  //
  //   return vnodes
  // }
}
</script>

<style scoped lang='scss'>

</style>
