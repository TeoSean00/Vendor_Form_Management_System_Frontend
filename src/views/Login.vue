<template>
  <div class="col-md-12 login-bg-1 h-100">
    <div
      class="row offset-1 col-9 justify-content-center align-items-center h-100"
    >
      <div class="card my-auto" style="height: 75vh">
        <h2 class="card-title text-center mt-5 pt-3 text-main-blue">
          Quantum Leap Incorporation
        </h2>
        <div class="card-body">
          <!-- Form begins -->
          <!-- Username -->
          <div class="offset-3 col-6 text-center my-2 pt-3">
            <form name="form" @submit.prevent="handleLogin">
              <div class="form-group text-dark-purple">
                <div class="form-floating my-4">
                  <input
                    required
                    v-model="user.username"
                    type="text"
                    class="form-control form-control-sm"
                    name="username"
                    placeholder="Enter username."
                  />
                  <label for="username">Username</label>
                </div>
              </div>
              <!-- Password -->
              <div class="form-group text-dark-purple">
                <div class="form-floating my-4">
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Enter password."
                    required
                  />
                  <label for="password">Password</label>
                </div>
              </div>
              <!-- Button -->
              <div class="form-group">
                <button
                  class="col-12 mb-5 btn btn-lg btn-main-blue btn-block"
                  :disabled="loading"
                >
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
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import User from "../models/user";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
      router.push("/");
    } else {
      console.log("not logged in");
    }

    const handleLogin = async () => {
      loading.value = true;
      if (user.username && user.password) {
        await auth.login(user).then(
          (response) => {
            toast.success("Login successful!", {
              position: toast.POSITION.TOP_CENTER,
              pauseOnHover: false,
              autoClose:2000,
            });
            router.push("/");
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

<style>
.login-bg-1 {
  left: 0px;
  position: fixed;
  width: 110vw;
  height: 110vh;
  background: linear-gradient(
    to right,
    #0378a6 0%,
    #0378a6 50%,
    #54b5bf 50%,
    #54b5bf 100%
  );
}
</style>
