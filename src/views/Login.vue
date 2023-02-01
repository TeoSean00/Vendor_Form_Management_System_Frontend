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
            :rules="isRequired"
            v-model="user.username"
            type="text"
            class="form-control"
            name="username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
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
            {{ auth }}
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
import { useRouter } from "vue-router";

import { Field, Form } from "vee-validate";

export default {
  components: {
    Field,
    Form,
  },
  setup() {
    var auth = useAuthStore();
    var user = new User("", "");
    var loading = ref(false);
    var message = ref("");
    const router = useRouter();

    if (auth.status.loggedIn) {
      // can change this later
      router.push("/profile");
    } else {
      console.log("not logged in");
    }

    const handleLogin = async () => {
      console.log("store object is", auth);
      loading.value = true;
      //add in veevalidate here when solved
      if (user.username && user.password) {
        await auth.login(user).then(
          () => {
            alert("successfully logged in!");
            router.push("/profile");
          },
          (error) => {
            loading.value = false;
            message.value =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    };

    return { handleLogin, user, loading, message, auth };
  },
};
</script>

<style></style>
