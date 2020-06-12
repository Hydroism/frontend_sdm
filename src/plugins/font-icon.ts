import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Vue from "vue";

/**
 * https://www.hangge.com/blog/cache/detail_2104.html
 */

library.add(fas);

Vue.component('font-icon', FontAwesomeIcon);
// Vue.component('font-layers', FontAwesomeLayers);
// Vue.component('font-layers-text', FontAwesomeLayersText);
