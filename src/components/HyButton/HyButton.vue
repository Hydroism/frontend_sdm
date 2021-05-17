<template>
  <!--  .prevent不加的话，在表单提交中，会以表单的方式去提交了-->
  <el-button :loading="loadingStatus" v-bind="$attrs" @click.prevent="handleClick">
    <slot/>
  </el-button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class HyButton extends Vue {
  loadingStatus: boolean = false

  @Prop({default: false})
  autoLoading!: boolean

  @Prop({default: false})
  autoConfirm!: boolean

  handleClick() {
    if (this.autoLoading || this.autoConfirm) {
      this.loadingStatus = true
    }

    if (this.autoConfirm) {
      this.$hyConfirm('此操作将永久删除该数据，是否继续？',
        () => {
          this.$emit('confirm', () => this.loadingStatus = false)
        },
        () => {
          this.loadingStatus = false
          this.$emit('cancel')
        }
      )
    } else {
      this.$emit('click', () => this.loadingStatus = false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
