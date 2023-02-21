<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            name="username"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            name="email"
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
          <button class="btn btn-primary btn-block">Sign Up</button>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../models/user";
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    var user = new User("", "", "");
    var submitted = ref(false);
    var successful = ref(false);
    var message = ref("");
    var auth = useAuthStore();
    var router = useRouter();

    const handleRegister = async () => {
      message.value = "";
      submitted.value = true;
      auth.register(user).then(
        (data) => {
          message.value = data.message;
          successful.value = true;
        },
        (error) => {
          console.log(error);
          message.value =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          successful.value = false;
        }
      );
    };
    return { user, handleRegister, message, successful };
  },
};
</script>
