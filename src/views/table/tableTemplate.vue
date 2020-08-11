<template>
  <div class="app-container">
    <table-top-panel>
      <template slot="left-panel">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd" v-permission="'tableTemplate_add'">添加视图</el-button>
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


export function logMethod(
  target: Object,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
  // target === Employee.prototype
  // propertyName === "greet"
  // propertyDesciptor === Object.getOwnPropertyDescriptor(Employee.prototype, "greet")

  console.log(target, propertyName, propertyDescriptor);


  const method = propertyDescriptor.value;

  propertyDescriptor.value = function (...args: any[]) {
    // 将 greet 的参数列表转换为字符串
    const params = args.map(a => JSON.stringify(a)).join();
    // 调用 greet() 并获取其返回值
    const result = method.apply(this, args);
    // 转换结尾为字符串
    const r = JSON.stringify(result);
    // 在终端显示函数调用细节
    console.log(`Call: ${propertyName}(${params}) => ${r}`);
    // 返回调用函数的结果
    return result;
  }
  return propertyDescriptor;
};


@Component({
  components: {TableTopPanel, TableSearchBar, TablePagination, HyTable}
})
export default class tableTemplate extends Vue {
  searchInput: string = '';
  loading: boolean = true;
  tableData: any = [];
  pageQuery: PageQuery = new PageQuery();

  created() {
    this.getData();
  };

  getData() {
  };

  @logMethod
  handleAdd() {
    console.log(this.searchInput, this.pageQuery);
  };

}
</script>

<style scoped lang='scss'>

</style>
