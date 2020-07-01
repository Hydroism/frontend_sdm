<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script lang="ts">
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class ThemePicker extends Vue {
  theme: string = '';
}
</script>

<style scoped lang='scss'>

</style>
