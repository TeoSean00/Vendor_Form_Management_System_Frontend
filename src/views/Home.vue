<template>
  <div >
      <Navbar/>
      <div class="row px-5 pt-3">
        <p class="text-secondary-blue">Welcome back, <span class="text-main-blue fw-bold">{{ user }}</span> !</p>
      </div>
      <div class="row"></div>
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="container">
      <div v-for="workflow in workflows" :key="workflow">
        {{ workflow }}
      </div>

    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import UserService from "../services/userService";

import Navbar from "../components/Navbar.vue";
import TopBanner from "../components/TopBanner.vue";

export default {
  components: {
      Navbar,
      TopBanner
    },
  setup() {
    var content = ref("");
    const user = ref("Admin XXX");
    var workflows = ref(["Workflow 1", "Workflow 2", "Workflow 3", "Workflow 4"]);
    // UserService.getPublicContent().then(
    //   (response) => {
    //     content.value = response.data;
    //   },
    //   (error) => {
    //     content.value =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
    return { content, user, workflows };
  },
};
</script>
