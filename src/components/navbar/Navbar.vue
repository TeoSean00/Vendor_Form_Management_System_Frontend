<template>
  <div class="row bg-white">
    <div class="col-6">
      <h1 class="text-main-blue px-3 py-3 mx-3 my-3">
        Quantum Leap Incorporation
      </h1>
    </div>
    <div class="col-6">
      <nav class="navbar navbar-expand navbar-light mt-5 px-0">
        <a href="" class="navbar-brand" @click.prevent></a>
        <div class="navbar-nav m-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" >
              <font-awesome-icon icon="home" />Home
            </router-link>
          </li>
          <div v-if="!currentUser" class="navbar-nav m-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="user-plus" />Sign Up
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" />Login
              </router-link>
            </li>
          </div>

          <div v-if="currentUser" class="navbar-nav m-auto">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" />LogOut
              </a>
            </li>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";
export default {
  setup() {
    var auth = useAuthStore();
    var currentUser = ref(auth.user);
    const showAdminBoard = () => {
      if (currentUser.value && currentUser.value.roles) {
        currentUser.value.roles.includes("ROLE_ADMIN");
      }
      return false;
    };
    const showModeratorBoard = () => {
      if (currentUser.value && currentUser.value.roles) {
        return currentUser.value.roles.includes("ROLE_MODERATOR");
      }
      return false;
    };

    const router = useRouter();

    const logOut = async () => {
      auth.logout();
      alert("successfully logged out!");
      router.push("/");
    };
    return { currentUser, showAdminBoard, showModeratorBoard, logOut };
  },
};
</script>
