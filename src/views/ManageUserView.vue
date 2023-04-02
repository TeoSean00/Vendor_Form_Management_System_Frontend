<template>
  <div class="container-flex">
    <Navbar />

    <div class="row">
      <div class="col-8 offset-2 fs-5 fw-bold mt-5 mb-2 text-main-blue">
        User Manager
        <button class="btn btn-main-blue float-end" @click="toggleCreateUser">
          Create User
        </button>
      </div>
      <div class="col-8 offset-2 text-center">
        <table class="table table-bordered table-striped text-main-blue">
          <thead v-if="users">
            <tr>
              <th class="col-1" scope="col">Name</th>
              <th class="col-2" scope="col">Email</th>
              <th class="col-2" scope="col">Role</th>
              <th class="col-2" scope="col">Organisation</th>
            </tr>
          </thead>
          <thead v-else>
            <tr>
              <th class="col-1 py-5" scope="col">
                You have zero users currently. <br />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.roles[0].name }}</td>
              <td v-if="user.vendorId == null">Quantum Leap Incorporation</td>
              <td v-else>{{ user.vendorName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar/NavbarJP.vue";
import { useRouter } from "vue-router";
import UserService from "../services/user/userService";
import VendorService from "../services/vendor/vendorService";
import { ref } from "vue";
export default {
  components: { Navbar },
  setup() {
    var users = ref([]);

    var getUsers = async () => {
      users.value = await UserService.getUsers();
      updateUsers();
    };
    var updateUsers = async () => {
      for (var i = 0; i < users.value.length; i++) {
        if (users.value[i].vendorId != null) {
          var vendorNum = users.value[i].vendorId;
          var vendor = await VendorService.getVendor(vendorNum);
          users.value[i].vendorName = vendor.name;
        }
      }
    }
    getUsers();
    
    var router = useRouter();

    var toggleCreateUser = () => {
      router.push("/createUser");
    };
    return { users, toggleCreateUser };
  },
};
</script>
