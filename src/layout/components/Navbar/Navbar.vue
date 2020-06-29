<template>
  <div class="nav-bar">
    <hamburger/>

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import Hamburger from "@/layout/components/Navbar/Hamburger.vue";
import Breadcrumb from "@/layout/components/Navbar/Breadcrumb.vue";

@Component({
  components: {Hamburger, Breadcrumb}
})
export default class Navbar extends Vue {

}
</script>

<style scoped lang='scss'>
.nav-bar{
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .breadcrumb-container {
    float: left;
  }

  .right-menu{
    float: right;
    height: 100%;
    line-height: 50px;
  }
}
</style>
