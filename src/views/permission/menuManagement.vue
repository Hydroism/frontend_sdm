<template>
  <div class="app-container">
    <table-top-panel>
      <template slot="left-panel">
        <el-button type="primary" size="small">测试东西</el-button>
        <el-button type="primary" size="small">测试东西</el-button>
        <el-button type="primary" size="small">测试东西</el-button>
      </template>
      <template slot="right-panel">
        <el-button type="success" size="small">测试东西</el-button>
        <el-button type="success" size="small">测试东西</el-button>
        <el-button type="success" size="small">测试东西</el-button>
        <el-button type="success" size="small">测试东西</el-button>
        <table-search-bar v-model="value" @handleSercha="queryData" />
      </template>
    </table-top-panel>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {HyTable, HyTableColumn,  TableTopPanel, TableSearchBar, TablePagination} from "@/components/HyTable";

@Component({
  components:{TableTopPanel, TableSearchBar, TablePagination, HyTable, HyTableColumn}
})
export default class menuManagement extends Vue {
  value:string = '';
  queryData(){}
}
</script>

<style scoped lang='scss'>

</style>
