import Vue from "vue";
import Buefy from "buefy";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import "@/theme/mingle-theme.scss";

Vue.config.productionTip = false;
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Buefy, {
  defaultIconComponent: "font-awesome-icon",
  defaultIconPack: "fas",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
