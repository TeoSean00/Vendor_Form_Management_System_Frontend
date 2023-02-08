<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import NavbarVertical from "./components/NavBarBackup.vue";
import TopBanner from "./components/TopBanner.vue";

components: {
  Navbar;
  TopBanner;
  NavbarVertical;
}
</script>

<template>
  <div class="container-fluid ">
    <!-- <TopBanner/> -->
    <!-- <Navbar />   -->
    <!-- <NavbarVertical/> -->
    <RouterView />
  </div>
</template>

<style scoped>

/* .navbar {
  background-color: lightgray;
  padding: 1.2rem;
} */
</style>
