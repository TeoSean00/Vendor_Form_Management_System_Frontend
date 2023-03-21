<template>
  <div
    class="container-fluid bluebg d-flex justify-content-between m-0"
    style="width: 100%"
  >
    <div>
      <router-link to="/vendorView" class="nav-link text-light" v-if="isUser">
        <img
          src="../../assets/Logo.png"
          alt=""
          style="width: 80px; height: 80px"
          class="mt-3 mx-5"
        />
      </router-link>
      <router-link to="/" class="nav-link text-light" v-else>
        <img
          src="../../assets/Logo.png"
          alt=""
          style="width: 80px; height: 80px"
          class="mt-3 mx-5"
        />
      </router-link>
    </div>
    <div>
      <nav class="navbar navbar-expand navbar-light mt-5 px-0">
        <a href="" class="navbar-brand" @click.prevent></a>

        <div class="navbar-nav mr-auto mx-4">
          <li class="nav-item" v-if="isUser">
            <router-link to="/vendorView" class="nav-link text-light">
              <font-awesome-icon
                class="text-light"
                style="width: 25px; height: 25px"
                icon="home"
              />
            </router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/" class="nav-link text-light">
              <font-awesome-icon
                class="text-light"
                style="width: 25px; height: 25px"
                icon="home"
              />
            </router-link>
          </li>
          <!-- <li class="nav-item">
              <router-link to="#" class="nav-link text-light">
                <font-awesome-icon class="text-light" style="width: 25px; height: 25px; " icon="bell" />
              </router-link>
            </li> -->
          <li class="nav-item">
            <router-link to="/formbuilder" class="nav-link text-light">
              <font-awesome-icon
                class="text-light"
                style="width: 25px; height: 25px"
                icon="clipboard"
              />
            </router-link>
          </li>
          <!-- <li class="nav-item">
              <router-link to="/profile" class="nav-link text-light">
                <font-awesome-icon class="text-light" style="width: 25px; height: 25px; " icon="user" />
              </router-link>
            </li> -->
          <!-- <li v-if="showAdminBoard" class="nav-item">
              <router-link to="/admin" class="nav-link">Admin Board</router-link>
            </li>
            <li v-if="showModeratorBoard" class="nav-item">
              <router-link to="/mod" class="nav-link">Moderator Board</router-link>
            </li> -->
          <!-- <li class="nav-item">
              <router-link v-if="currentUser" to="/user" class="nav-link"
                >User</router-link
              >
            </li> -->
        </div>

        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link text-light">
              <!-- <font-awesome-icon icon="user-plus" /> -->
              &nbsp; Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link text-light">
              <!-- <font-awesome-icon icon="sign-in-alt" /> -->
              &nbsp; Login
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link text-light">
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href @click.prevent="logOut">
              <!-- <font-awesome-icon icon="sign-out-alt" /> -->
              Log Out
            </a>
          </li>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
export default {
  setup() {
    var auth = useAuthStore();
    var currentUser = ref(auth.user);
    var isUser = ref(currentUser.value.roles.includes("ROLE_USER"));
    const showAdminBoard = () => {
      console.log(currentUser);
      console.log(currentUser.value);
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
      console.log("logout called");
      console.log(auth);
      auth.logout();
    };
    return { currentUser, showAdminBoard, showModeratorBoard, logOut, isUser };
  },
};
</script>
