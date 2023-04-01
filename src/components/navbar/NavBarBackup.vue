<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="" class="navbar-brand" @click.prevent>smartForm</a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/home" class="nav-link">
          <font-awesome-icon icon="home" />Home
        </router-link>
      </li>
      <li v-if="showAdminBoard" class="nav-item">
        <router-link to="/admin" class="nav-link">Admin Board</router-link>
      </li>
      <li v-if="showModeratorBoard" class="nav-item">
        <router-link to="/mod" class="nav-link">Moderator Board</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="currentUser" to="/user" class="nav-link"
          >User</router-link
        >
      </li>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">
          <font-awesome-icon icon="user-plus" />Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" />Login
        </router-link>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
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
  </nav>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
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

    const logOut = async () => {
      auth.logout();
    };
    return { currentUser, showAdminBoard, showModeratorBoard, logOut };
  },
};
</script>
