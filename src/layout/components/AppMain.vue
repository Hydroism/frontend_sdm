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

</style>
