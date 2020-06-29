import {DeviceEnum} from "@/store/modules/app";
import {Vue, Component, Watch} from "vue-property-decorator";
import {namespace} from "vuex-class";

const WIDTH = 992 // refer to Bootstrap's responsive design
const appModule = namespace('app');

@Component
export default class ResizeHandler extends Vue {
  @appModule.Getter('isCollapse') isCollapse!: boolean;
  @appModule.Getter('device') device!: DeviceEnum;

  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  };

  created(){
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.$store.dispatch('app/toggleDevice', DeviceEnum.mobile);
      this.$store.dispatch('app/closeSidebar')
    }
  };

  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  };

  // 不存在该情况,created()已经能够处理了。
  // @Watch('$route')
  // onRouteChange(): void {
  //   if (this.device === DeviceEnum.mobile && this.isCollapse) {
  //     this.$store.dispatch('app/closeSidebar')
  //   }
  // };

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  $_isMobile() {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH
  };

  $_resizeHandler() {
    const isMobile = this.$_isMobile();
    this.$store.dispatch('app/toggleDevice', isMobile ? DeviceEnum.mobile : DeviceEnum.desktop)

    if (isMobile) {
      this.$store.dispatch('app/closeSidebar')
    }
  };
}
