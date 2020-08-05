<template>
  <div :class="['refresh',{'loading':loading}]">
    <svg-icon icon-class="refresh" @click="handleRefresh"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class Refresh extends Vue {
  loading: boolean = false;

  handleRefresh() {
    if (this.loading) {
      return
    }

    this.loading = true;
    this.$store.dispatch('tagsBar/delCachedRoute', this.$route).then(() => {
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + this.$route.fullPath
        });
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    })
  }
}
</script>

<style scoped lang='scss'>
  .loading ::v-deep svg{
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>
