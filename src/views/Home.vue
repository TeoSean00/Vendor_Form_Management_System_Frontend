<template>
  <div>
    <Navbar />

    <div class="row px-5 pt-3">
      <p class="text-secondary-blue">
        Welcome back,
        <span class="text-main-blue fw-bold">{{ currentUser.username }}</span> !
      </p>
    </div>
    <template v-if="adminStatus">
      <AdminView />
    </template>
  </div>
</template>
<script>
import { ref } from "vue";
import UserService from "../services/user/userService";

import Navbar from "../components/navbar/Navbar.vue";
import TopBanner from "../components/navbar/TopBanner.vue";
import AdminView from "./AdminView.vue";

import { useAuthStore } from "../stores/authStore";

export default {
  components: {
    Navbar,
    TopBanner,
    AdminView,
  },
  setup() {
    var content = ref("");
    var auth = useAuthStore();
    var currentUser = auth.user;
    console.log("home user is currently", currentUser);

    var adminStatus = currentUser.roles.includes("ROLE_ADMIN") ? true : false;

    return { content, currentUser, adminStatus };
  },
};
</script>
