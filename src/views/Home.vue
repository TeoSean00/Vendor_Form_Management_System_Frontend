<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
<script>
import { ref } from "vue";
import UserService from "../services/userService";

export default {
  setup() {
    var content = ref("");

    UserService.getPublicContent().then(
      (response) => {
        content.value = response.data;
      },
      (error) => {
        content.value =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    return { content };
  },
};
</script>