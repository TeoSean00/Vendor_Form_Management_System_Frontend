<template>
  <div class="container-flex">
    <Navbar />
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ...
      {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import Navbar from "../components/navbar/Navbar.vue";
export default {
  components: { Navbar },
  setup() {
    var auth = useAuthStore();
    var router = useRouter();

    var currentUser = auth.user;
    console.log("currentUser is ,", currentUser);

    if (!auth.user) {
      router.push("/login");
    }

    return { currentUser };
  },
};
</script>
