<template>
  <div class="home">
      shouye 
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import {Component, Vue} from "vue-property-decorator";
import DragWindow from "@/components/DragWindow/DragWindow.vue";
import draggable from "vuedraggable";

@Component({
  components: {DragWindow, draggable}
})
export default class Home extends Vue {
  list1: any[] = [{
    text: '内容1',
    id: 1
  }, {
    text: '内容2',
    id: 2
  }, {
    text: '内容3',
    id: 3
  }];
  list2: any[] = [{
    text: '内容1',
    id: 1
  }, {
    text: '内容2',
    id: 2
  }, {
    text: '内容3',
    id: 3
  }, {
    text: '内容4',
    id: 4
  }]
  list3: any[] = [{
    text: '内容1',
    id: 1
  }, {
    text: '内容2',
    id: 2
  }, {
    text: '内容3',
    id: 3
  }]

  logout() {
    this.$store.dispatch('user/logout');
    this.$router.replace('/login')
  }
}

</script>
<style scoped lang="scss">
  .drag-container {
    padding: 5px;
  }
  /*.flip-list-move {*/
  /*  transition: transform 1s;*/
  /*}*/
</style>
