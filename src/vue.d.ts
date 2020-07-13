import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $hySuccess:any
    $hyWarn:any
    $hyError:any
    $hyConfirm:any
  }
}
