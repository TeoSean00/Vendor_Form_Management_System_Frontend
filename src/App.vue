<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

components: {
  Navbar;
}
</script>

<template>
  <div>
    <Navbar />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: lightgray;
  padding: 1.2rem;
}
</style>
