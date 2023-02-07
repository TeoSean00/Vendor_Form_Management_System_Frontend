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
      <h1 class="text-main-blue">Hi</h1>
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
