<template>
  <div
    class="container-fluid bg-white shadow d-flex justify-content-between m-0"
    style="width: 100%"
  >
    <div>
      <nav class="navbar navbar-expand navbar-light px-0">
        <div>
          <router-link
            to="/"
            class="nav-link text-main-blue "
            v-if="isAdmin || isModerator"
          >
          <div class="d-flex align-items-baseline pb-3 ps-5">
            <img
              src="../../assets/Quantum Logo v2.PNG"
              alt=""
              class="mt-3 mx-1"
            />
          </div>      
          </router-link>
          <router-link to="/vendorView" class="nav-link text-dark-grey" v-else>
            <div class="d-flex align-items-baseline pb-3 ps-5">
              <img
                src="../../assets/Quantum Logo v2.PNG"
                alt=""
                class="mt-3 mx-1"
              />

            </div>
          </router-link>
        </div>
        <a href="" class="navbar-brand" @click.prevent></a>
        <div class="navbar-nav mr-auto mx-5">
          <li class="nav-item ms-1 me-3" v-if="isAdmin || isModerator">
            <router-link to="/" class="nav-link text-secondary-blue fw-bold">
              Home
            </router-link>
          </li>
          <li class="nav-item ms-1 me-3" v-else>
            <router-link to="/vendorView" class="nav-link text-secondary-blue fw-bold">
              Home
            </router-link>
          </li>
          <li class="nav-item mx-5">
            <router-link v-if="isAdmin || isModerator" to="/formbuilder" class="nav-link text-main-blue fw-bold">
              FormBuilder
            </router-link>
          </li>
          <li class="nav-item mx-5">
            <router-link v-if="isAdmin || isModerator" to="/vendors" class="nav-link text-dark-grey">
              Vendors
            </router-link>
          </li>
          <li class="nav-item mx-5">
            <router-link v-if="isAdmin || isModerator" to="/users" class="nav-link text-dark-grey">
              Users
            </router-link>
          </li>
          <li class="nav-item mx-5">
            <router-link v-if="isAdmin || isModerator" to="/managetemplates" class="nav-link text-dark-grey">
              Templates
            </router-link>
          </li>
        </div>


        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link text-secondary-blue">
              <!-- <font-awesome-icon icon="user-plus" /> -->
              &nbsp; Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link text-secondary-blue">
              <!-- <font-awesome-icon icon="sign-in-alt" /> -->
              &nbsp; Login
            </router-link>
          </li>
        </div>
        <div v-if="currentUser" class="navbar-nav ml-auto text-end " style="margin-left:200px">
          <li class="nav-item ms-auto">
            <router-link to="/profile" class="nav-link text-main-blue">
              <font-awesome-icon :icon="['fas', 'circle-user']" size="xl" class="mx-2"/>
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-secondary" href @click.prevent="logOut">
              <!-- <font-awesome-icon icon="sign-out-alt" /> -->
              Log Out
            </a>
          </li>
        </div>
      </nav>
    </div>
  </div>
  <div
    class="container-fluid bg-main-blue shadow d-flex justify-content-between m-0"
    style="width: 100%; height:2vh"
  >
  </div>
  <div
    class="container-fluid bg-secondary-blue shadow d-flex justify-content-between m-0"
    style="width: 100%; height:1.5vh"
  >
  </div>
  <div
    class="container-fluid bg-turqouise shadow d-flex justify-content-between m-0"
    style="width: 100%; height:1vh"
  >
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
    var isAdmin = ref(currentUser.value.roles.includes("ROLE_ADMIN"));
    var isModerator = ref(currentUser.value.roles.includes("ROLE_MODERATOR"));
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
    return {
      currentUser,
      showAdminBoard,
      showModeratorBoard,
      logOut,
      isUser,
      isAdmin,
      isModerator,
    };
  },
};
</script>
