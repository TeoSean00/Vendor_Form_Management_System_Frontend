<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            name="username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import User from "../models/user";
import { ref, computed } from "vue";

export default {
  setup() {
    var authStore = useAuthStore();
    var user = new User("", "");
    var loading = false;
    var message = "";
    var password = "";

    if (authStore.status.loggedIn) {
      // can change this later
      this.$router.push("/about");
    }

    const handleLogin = () => {
      console.log("store object is", authStore.login);
      loading = true;
      //add in veevalidate here when solved
      if (user && password) {
        authStore.login(user).then(
          () => {
            this.$router.push("/about");
            alert("successfully logged in!");
          },
          (error) => {
            this.loading = false;
            this.message = alert(error);
          }
        );
      }
    };

    return { handleLogin, user, loading, message, password };
  },
};
</script>

<style></style>
