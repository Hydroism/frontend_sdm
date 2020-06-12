<template>
  <div>
    <sidebar class="sidebar-container" />
    <app-main />
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import Sidebar from "@/layout/components/Sidebar/Sidebar.vue";
  import AppMain from "@/layout/components/AppMain.vue";

  @Component({
    components:{Sidebar, AppMain}
  })
  export default class layout extends Vue {

  }
</script>

<style scoped lang='scss'>

</style>
