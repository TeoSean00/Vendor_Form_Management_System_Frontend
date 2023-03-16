<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/navbar/Navbar.vue";
import NavbarVertical from "./components/navbar/NavBarBackup.vue";
import TopBanner from "./components/navbar/TopBanner.vue";

components: {
  Navbar;
  TopBanner;
  NavbarVertical;
}
</script>

<template>
    <!-- <TopBanner/> -->
    <!-- <Navbar />   -->
    <!-- <NavbarVertical/> -->
    <RouterView />
</template>

<style scoped>

/* .navbar {
  background-color: lightgray;
  padding: 1.2rem;
} */
</style>
