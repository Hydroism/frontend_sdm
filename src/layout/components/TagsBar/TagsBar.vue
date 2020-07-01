<template>
  <div class="tags-bar-container">
    <!--    todo 超过容器的情况-->
    <el-tabs
      type="card" class="tags-content" v-model="tabActive" :stretch="false"
      @tab-click="handleTabClick" @tab-remove="handleTabRemove"
      @contextmenu.prevent.native="openMenu"
    >
      <el-tab-pane
        v-for="item in visitedRoutes" :key="item.path"
        :label="item.title" :name="item.path" :closable="!isAffix(item)"
      />
    </el-tabs>

    <!--todo 右键菜单-->
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li>Refresh</li>
      <li>Close</li>
    </ul>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import ScrollPane from "./ScrollPane.vue";
import {namespace} from "vuex-class";
import {VisitedRoute} from "@/store/modules/tagsBar";
import {Route, RouteConfig} from "vue-router";
import path from "path"

const tagsBarModule = namespace('tagsBar');

@Component({
  components: {ScrollPane}
})
export default class TagsBar extends Vue {
  @tagsBarModule.Getter('visitedRoutes') visitedRoutes!: VisitedRoute[];

  affixTags: RouteConfig[] = [];
  tabActive: string = '';

  visible: boolean = false;
  left: number = 0;
  top: number = 0;

  @Watch('$route')
  onRouteChange(): void {
    this.addTags();
    this.tabActive = this.$route.path
  }

  @Watch('visible')
  onVisibleChange(value:boolean):void{
    // if (value) {
    //   document.body.addEventListener('click', this.closeMenu)
    // } else {
    //   document.body.removeEventListener('click', this.closeMenu)
    // }
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

  handleTabClick(): void {
    if (this.isActive()) {
      return
    }
    const route: VisitedRoute | undefined = this.visitedRoutes.find(e => {
      return e.path === this.tabActive
    });
    this.$router.push({
      path: route && route.path,
      query: route && route.query,
    })
  };

  async handleTabRemove(tab: any) {
    const route: VisitedRoute | undefined = this.visitedRoutes.find(e => {
      return tab === e.path
    });
    const visitedRoutes = await this.$store.dispatch('tagsBar/delVisitedRoute', route);
    if (this.isActive()) {
      this.toLastView(visitedRoutes, route as VisitedRoute)
    }
  };

  toLastView(visitedRoutes: VisitedRoute[], view: Route) {
    const latestView = visitedRoutes.slice(-1)[0];
    if (latestView) {
      this.$router.push(latestView.fullPath);
    } else {
      this.$router.push('/')
    }
  };

  openMenu(e:any) {
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    //@ts-ignore
    const offsetWidth = this.$el.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right

    if (left > maxLeft) {
      this.left = maxLeft
    } else {
      this.left = left
    }

    this.top = e.clientY
    this.visible = true
  };

  closeMenu() {
    this.visible = false
  }
}

</script>

<style scoped lang='scss'>
  $base-tag-item-height: 30px;

  .tags-bar-container {
    height: 42px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    user-select: none;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    padding-left: $base-padding;
    padding-right: $base-padding;

    .tags-content {
      width: calc(100% - 90px);
      height: $base-tag-item-height;

      ::v-deep {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height;
          line-height: $base-tag-item-height;
        }

        .el-tabs__header {
          border-bottom: 0;

          .el-tabs__nav {
            border: 0;
          }

          .el-tabs__item {
            height: $base-tag-item-height;
            line-height: $base-tag-item-height;
            border: 1px solid $base-border-color;
            margin-right: 5px;
            border-radius: $base-border-radius;
            box-sizing: border-box;

            &.is-active {
              background: $base-color-blue;
              color: $base-color-white;
              border: 1px solid $base-color-blue;
            }

            .el-icon-close {
              position: relative;
              font-size: 12px;
              width: 0;
              height: 14px;
              vertical-align: middle;
              line-height: 14px;
              overflow: hidden;
              top: -1px;
              right: -2px;
              transform-origin: 100% 50%;
            }
          }
        }
      }
    }

  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
</style>
