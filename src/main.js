import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faClipboard,
  faPlus,
  faPenToSquare,
  faFile,
  faUsers,
  faBell,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faClipboard, faPlus, faPenToSquare, faUsers,faBell, faFile);


import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
