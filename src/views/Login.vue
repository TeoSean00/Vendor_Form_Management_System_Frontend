<template>
  <div class="col-md-12 login-bg-1 h-100">
    <div class="row offset-3 col-6 justify-content-center align-items-center h-100">
      <div class="card my-auto">
        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
        <h2 class="card-title text-center mt-5">Quantum Leap Incorporation</h2>
        <div class="card-body">
          <h5 class="card-title text-center my-2">Login</h5>
          <!-- Form begins -->
          <!-- Username -->
          <div class="offset-3 col-6 text-center my-2">
            <form name="form" @submit.prevent="handleLogin">
              <div class="form-group">
                <div class="form-floating my-4">
                  <input
                  :rules="isRequired"
                  v-model="user.username"
                  type="text"
                  class="form-control form-control-sm"
                  name="username"
                  placeholder="Enter username." required
                  />
                  <label for="username">Username</label>
                </div>
              </div>
              <!-- Password -->
              <div class="form-group">
                <div class="form-floating my-4">
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Enter password." required
                  />
                  <label for="password">Password</label>
                </div>
              </div>
              <!-- Button -->
              <div class="form-group ">
                <button class="col-12 mb-5 btn btn-lg btn-main-blue btn-block" :disabled="loading">
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
    <!-- Form copied above already, not sure if needed or not  -->
    <!-- <div class="card card-container">
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
    </div> -->
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
          (response) => {
            console.log(response);
            alert("successfully logged in!", response);
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
