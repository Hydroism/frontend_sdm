<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {CreateElement} from "vue";

@Component
export default class redirect extends Vue {
  created() {
    console.log('yyy');
    const {params, query} = this.$route;
    const {path} = params;
    this.$router.replace({path: '/' + path, query})
  };

  render(h:CreateElement) {
    return h()
  }
}
</script>

