import path from "path";
<template>
  <div style="user-select: none;">
    <el-submenu v-if="isHaveChildren(item.children, item)" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :parent-path="resolvePath(item.path)"
        :is-nest="true"
      />
    </el-submenu>

    <template v-else>
      <item-link v-if="oneChildOrSelfItem.meta" :to="resolvePath(oneChildOrSelfItem.path)">
        <el-menu-item :index="resolvePath(oneChildOrSelfItem.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="oneChildOrSelfItem.meta.icon" :title="oneChildOrSelfItem.meta.title"/>
        </el-menu-item>
      </item-link>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {RouteConfig} from "vue-router";
import ItemLink from "@/layout/components/Sidebar/ItemLink.vue";
import Item from "@/layout/components/Sidebar/Item.vue";
import { isExternal } from "@/utils/validate";
import path from "path";

@Component({
  name: 'sidebarItem',
  components: {ItemLink, Item}
})
export default class SidebarItem extends Vue {
  @Prop({required: true}) item!: RouteConfig;
  @Prop({default: false}) isNest!: boolean;
  @Prop({default: ''}) parentPath!: string;

  basePath:string = this.parentPath;

  oneChildOrSelfItem!: RouteConfig;

  isHaveChildren(children: undefined | RouteConfig[], parent: RouteConfig): boolean {
    if (children === undefined) {
      this.oneChildOrSelfItem = parent;
      return false
    }
    if (children.length === 1) {
      this.basePath = parent.path;
      this.oneChildOrSelfItem = children[0];
      return false
    }
    return children.length > 1
  }

  resolvePath(routePath: string): string {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    return path.resolve(this.basePath, routePath);
  }

}
</script>

<style scoped lang='scss'>

</style>
