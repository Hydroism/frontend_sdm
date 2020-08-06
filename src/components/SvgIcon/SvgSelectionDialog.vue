<template>
  <hy-dialog :visible.sync="dialogVisible" width="80%" title="图标库" :before-close="closeDialog" append-to-body :close-on-click-modal="true">
    <div class="grid">
      <div v-for="icon in svgIcons" :key="icon">
        <div :class="['icon-item', {'active':defaultSelected===icon}]" @click="handleSelect(icon)">
          <svg-icon :icon-class="icon" class-name="disabled"/>
          <span>{{ icon }}</span>
        </div>
      </div>
    </div>
  </hy-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import HyDialog from "@/components/HyDialog/HyDialog.vue";
import svgIcons from "@/plugins/icons/svg-icons"
import {RouterModel} from "@/model/router.model";

@Component({
  components: {HyDialog}
})
export default class SvgSelectionDialog extends Vue {
  dialogVisible: boolean = false;
  svgIcons: string[] = svgIcons;

  defaultSelected: string = '';

  openDialog(defaultSelected:string): void {
    this.defaultSelected = defaultSelected;
    this.dialogVisible = true;
  };

  closeDialog() {
    this.dialogVisible = false;
  };

  handleSelect(icon:string){
    this.$emit('handleSelect', {icon: icon});
    this.closeDialog();
  }

}
</script>

<style scoped lang='scss'>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;

    &:hover, &.active {
      color: $base-color-default;
    }
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
</style>
