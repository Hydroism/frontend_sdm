<template>
  <div class="app-container">
    <table-top-panel>
      <template slot="left-panel">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加视图</el-button>
      </template>
      <template slot="right-panel">
        <table-search-bar v-model="searchInput" @handleSercha="getData"/>
      </template>
    </table-top-panel>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="overflow:auto">
        <el-divider content-position="left">视图列表</el-divider>
        <ul class="infinite-list" v-infinite-scroll="getData" infinite-scroll-disabled="isNoMore">
          <li v-for="item in viewsList" :key="item.id" class="infinite-list-item">{{ item.label }}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <br/>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-divider content-position="left">视图权限控制</el-divider>

        <br/>
      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {HyTable, TableTopPanel, TableSearchBar, TablePagination} from "@/components/HyTable";
import {PageQuery} from "@/utils/page-query";
import viewsService from "@/api/viewsService";
import {ViewsModel} from "@/model/views.model";

@Component({
  components: {TableTopPanel, TableSearchBar, TablePagination, HyTable}
})
export default class viewsManagement extends Vue {
  searchInput: string = '';
  pageQuery: PageQuery = new PageQuery();

  /**
   * 视图列表
   */
  loading: boolean = false;
  viewsList: ViewsModel[] = [];


  getData() {
    if (this.loading) {
      return
    }
    this.loading = true;
    viewsService.getListViews(this.pageQuery).then(res => {
      this.pageQuery.covertResponses(res.data);
      this.viewsList = [...this.viewsList, ...res.data.results];
    }).finally(() => {
      this.loading = false
    })
  };

  handleAdd() {
  };

  get isNoMore(): boolean {
    return this.pageQuery.isLast();
  }
}
</script>

<style scoped lang='scss'>

</style>
