<template>
  <div class="container-flex">
    <Navbar />
    <div class="col-4 offset-4 mt-5 p-5 rounded shadow">
      <h1> Profile </h1>
      <div class="form-group row">
        <label for="userName" class="col-sm-2 col-form-label text-dark-grey">Name</label>
        <div class="col-sm-10">
          <input type="text" readonly class="form-control-plaintext" id="userName" :value="currentUser.username">
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label text-dark-grey">Email</label>
        <div class="col-sm-10">
          <input type="text" readonly class="form-control-plaintext" id="email" :value="currentUser.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="roles" class="col-sm-2 col-form-label text-dark-grey">Roles</label>
        <div class="col-sm-10">
          <ul>
            <li v-for="(role, index) in currentUser.roles" :key="index">
              {{ role }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import Navbar from "../components/navbar/NavbarJP.vue";
export default {
  components: { Navbar},
  setup() {
    var auth = useAuthStore();
    var router = useRouter();

    var currentUser = auth.user;

    if (!auth.user) {
      router.push("/login");
    }

    return { currentUser };
  },
};
</script>
