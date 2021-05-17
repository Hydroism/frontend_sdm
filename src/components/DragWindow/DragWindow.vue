<template>
  <el-col :sm="24" :md="12" :class="[{'minimize':isMinimize},'drag-window']" ref="dragWindow">
    <el-card :class="{'full-screen':isFullscreen}">
      <div slot="header" class="drag-window_header mover">
        <div style="flex-grow:1">windowTitle</div>
        <div>
          <svg-icon icon-class="minus" class="drag-win-icon minus" v-show="!isFullscreen" @click="handleMinus"/>
          <svg-icon :icon-class="isFullscreen?'fullscreen-shrink':'fullscreen-expand'" class="drag-win-icon fullscreen"
                    v-show="!isMinimize" @click="handleFullscreen()"/>
          <!--          <svg-icon icon-class="close" class="drag-win-icon close"/>-->
        </div>
      </div>
      <div>
        <slot/>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import draggable from 'vuedraggable'

@Component({
  components: {draggable}
})
export default class DragWindow extends Vue {
  isFullscreen: boolean = false;
  isMinimize: boolean = false;

  // @Prop({required: true}) name!: string;

  handleMinus() {
    this.isMinimize = !this.isMinimize;
    this.$nextTick(() => {
      let minimizeList = document.getElementsByClassName('minimize');
      for (let i = 0, length = minimizeList.length; i < length; i++) {
        (minimizeList[i] as HTMLElement).style.marginLeft = 20 * i + '%'
      }
    });
    if (!this.isMinimize) {
      (this.$refs.dragWindow as any).$el.style.marginLeft = 0
    }
  }

  handleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  };

}
</script>

<style scoped lang='scss'>
  .drag-window{
    transition: margin .5s ease;
  }

  .el-card {
    margin: 5px;
  }

  ::v-deep .el-card__header {
    padding: 10px;

    .drag-window_header {
      display: flex;
      justify-content: space-between;

      .drag-win-icon {
        margin: 0 5px;
        cursor: pointer;
      }
    }
  }

  //全屏
  .full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
  }

  //最小化
  .minimize {
    position: fixed;
    top: calc(100% - 40px);
    width: 20%;
  }
</style>
