<template>
  <div class="app-container">
    <table-top-panel>
      <template slot="left-panel">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加视图</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">按钮1</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">按钮2</el-button>
      </template>
      <template slot="right-panel">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">按钮3</el-button>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">按钮4</el-button>
        <table-search-bar v-model="searchInput" @handleSercha="getData"/>
      </template>
    </table-top-panel>

    <table-pagination v-model="pageQuery" @getData="getData"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {HyTable, TableTopPanel, TableSearchBar, TablePagination} from "@/components/HyTable";
import {PageQuery} from "@/utils/page-query";

@Component({
  components: {TableTopPanel, TableSearchBar, TablePagination, HyTable}
})
export default class tableTemplate extends Vue {
  searchInput: string = '';
  loading: boolean = true;
  tableData: any = [];
  pageQuery: PageQuery = new PageQuery();

  created(){
    this.getData();
  };

  getData() {
  };

  handleAdd() {
  };
}
</script>

<style scoped lang='scss'>

</style>
