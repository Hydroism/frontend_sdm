import path from "path";
<template>
  <div class="tags-bar-container">
    <!--    <scroll-pane ref="scrollPane" class="tags-bar-wrapper">-->
    <!--      <router-link-->
    <!--        class="tags-bar-item" tag="span" ref="tag" :class="isActive(item)?'active':''"-->
    <!--        :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"-->
    <!--      >-->
    <!--        {{ item.title }}-->
    <!--        <span v-if="!isAffix(item)" class="el-icon-close"/>-->
    <!--      </router-link>-->
    <!--    </scroll-pane>-->

    <!--    todo 超过容器的情况-->
    <el-tabs
      type="card" class="tags-content" v-model="tabActive" :stretch="false"
      @tab-click="handleTabClick" @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes" :key="item.path"
        :label="item.title" :name="item.path" :closable="!isAffix(item)"
        @click.native="handleTabItem"
      />
    </el-tabs>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import ScrollPane from "./ScrollPane.vue";
import {namespace} from "vuex-class";
import {VisitedRoute} from "@/store/modules/tagsBar";
import {RouteConfig} from "vue-router";
import path from "path"

const tagsBarModule = namespace('tagsBar');

@Component({
  components: {ScrollPane}
})
export default class TagsBar extends Vue {
  @tagsBarModule.Getter('visitedRoutes') visitedRoutes!: VisitedRoute[];

  affixTags: RouteConfig[] = [];
  tabActive: string = '';

  @Watch('$route')
  onRouteChange(): void {
    this.addTags();
    this.tabActive = this.$route.path
  }

  mounted(): void {
    this.initTags();
    this.addTags();
    this.tabActive = this.$route.path
  };

  get routes(): RouteConfig[] {
    return this.$store.getters['permission/routes']
  };

  isActive(): boolean {
    return this.tabActive === this.$route.path
  };

  isAffix(tag: VisitedRoute): boolean {
    return tag.meta && tag.meta.affix;
  };

  initTags(): void {
    const affixTags = this.affixTags = this.filterAffixTags(this.routes);
    for (const tag of affixTags) {
      // Must have tag name
      if (tag.name) {
        this.$store.dispatch('tagsBar/addVisitedRoute', tag)
      }
    }
  };

  filterAffixTags(routes: any[], basePath = '/'): RouteConfig[] {
    let tags: any[] = [];
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        console.log(tagPath);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: {...route.meta}
        })
      }
      if (route.children) {
        const tempTags = this.filterAffixTags(route.children, route.path);
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    });
    return tags
  };

  addTags(): void {
    const {name} = this.$route;
    if (name) {
      this.$store.dispatch('tagsBar/addVisitedRoute', this.$route)
    }
  };

  // moveToCurrentTag() {
  //   const tags: any = this.$refs.tag;
  //   this.$nextTick(() => {
  //     for (const tag of tags) {
  //       if (tag.to.path === this.$route.path) {
  //         //@ts-ignore
  //         this.$refs.scrollPane.moveToTarget(tag);
  //
  //         // when query is different then update
  //         if (tag.to.fullPath !== this.$route.fullPath) {
  //           this.$store.dispatch("tagsBar/updateVisitedRoute", this.$route);
  //         }
  //         break;
  //       }
  //     }
  //   });
  // };

  handleTabClick(): void {
    if (this.$route.path === this.tabActive) {
      return
    }
    const route: VisitedRoute | undefined = this.visitedRoutes.find(item => {
      return item.path === this.tabActive
    });
    this.$router.push({
      path: route && route.path,
      query: route && route.query,
    })
  };

  handleTabRemove(tab: any): void {
    this.$store.dispatch('tagsBar/delVisitedRoute');
    // if (this.isActive) {
    //
    // }

  };

  handleTabItem() {
    console.log("YY");
  };
}

</script>

<style scoped lang='scss'>
  .tags-bar-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

    .tags-bar-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
</style>
