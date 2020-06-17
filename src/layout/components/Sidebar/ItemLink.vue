<template>
  <router-link :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class ItemLink extends Vue {
  @Prop({required: true}) to!: string
}
</script>

<style scoped lang='scss'>

</style>
