<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {getToken} from "@/utils/auth"

@Component
export default class App extends Vue {
  async created() {
    if (getToken()) {
      await this.$store.dispatch('user/login', {
        username: 'admin',
        password: '123456'
      });
      await this.$store.dispatch('permission/getRoleRouter');
    }
  };
}
</script>
