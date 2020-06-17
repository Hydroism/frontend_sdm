<template>
  <div class="navbar">
    <hamburger/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import Hamburger from "@/layout/components/Navbar/Hamburger.vue";

@Component({
  components: {Hamburger}
})
export default class Navbar extends Vue {

}
</script>

<style scoped lang='scss'>

</style>
