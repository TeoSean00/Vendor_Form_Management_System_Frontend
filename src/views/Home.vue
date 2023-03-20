<template>
  <div class="mx-0">
    <NavbarJP />

    <div class="row px-5 pt-3">
      <h4 class="text-secondary-blue">
        Welcome back,
        <span class="text-main-blue fw-bold">{{ currentUser.username }}</span> !
      </h4>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 mt-5 order-xl-last ">
          <AdminView/>
        </div>

        <div class="col-12 order-xl-first">
          <AdminHomeDashboard />
        </div>
        
        
      </div>
    </div>
    
    

    
  </div>
</template>
<script>
import { ref } from "vue";
import UserService from "../services/user/userService";

import NavbarJP from "../components/navbar/NavbarJP.vue";
import TopBanner from "../components/navbar/TopBanner.vue";
import AdminView from "./AdminView.vue";
import AdminHomeDashboard from "../components/dashboard/AdminHomePage/AdminHomeDashboard.vue"

import { useAuthStore } from "../stores/authStore";

export default {
  components: {
    NavbarJP,
    TopBanner,
    AdminView,
    AdminHomeDashboard
  },
  setup() {
    var content = ref("");
    var auth = useAuthStore();
    var currentUser = auth.user;
    console.log("home user is currently", currentUser);

    // var adminStatus = ref(false);
    // if (currentUser) {
    //   adminStatus = currentUser.roles.includes("ROLE_ADMIN") ? true : false;
    // }

    return { content, currentUser };
  },
};
</script>
