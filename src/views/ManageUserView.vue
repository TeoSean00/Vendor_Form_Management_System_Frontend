<template>
  <div class="container-flex">
    <Navbar />

    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient bg-main-blue shadow-success rounded pt-4 pb-3 d-flex"
            >
              <h6 class="text-white text-capitalize ps-3">Manager Users</h6>
              <button
                class="btn btn-light ms-auto me-2"
                @click="toggleCreateUser"
              >
                Create User
              </button>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      User
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Role
                    </th>
                    <!-- <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Status
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Employed
                    </th> -->
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(user, index) in users" :key="index">
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKUG-MyqtxE3Wqxuyo5Y9g6ktlsZu_1iESyqbgWGxYg&s"
                              class="me-3 rounded"
                              style="width: 3rem"
                              alt="user1"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <h6 class="mb-0 text-sm">{{ user.username }}</h6>
                            <p class="text-xs text-secondary mb-0">
                              {{ user.email }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">
                          <template
                            v-for="(user, index) in user.roles"
                            :key="index"
                          >
                            {{ user.name }} <br />
                          </template>
                        </p>

                        <p class="text-xs text-secondary mb-0">
                          Testing Organization
                        </p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success"
                          >Online</span
                        >
                      </td>
                      <!-- <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >23/04/18</span
                          >
                        </td>
                        <td class="align-middle">
                          <a
                            href="javascript:;"
                            class="text-secondary font-weight-bold text-xs"
                            data-toggle="tooltip"
                            data-original-title="Edit user"
                          >
                            Edit
                          </a>
                        </td> -->
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import { useRouter } from "vue-router";
import UserService from "../services/user/userService";
import { ref } from "vue";
export default {
  components: { Navbar },
  setup() {
    var users = ref([]);

    var getUsers = async () => {
      users.value = await UserService.getUsers();
    };

    getUsers();

    // const users = [
    //   {
    //     id: "63d85d7193c8ae0f8f0809af",
    //     username: "Mr Admin",
    //     email: "moderator123@gmail.com",
    //     roles: ["ROLE_ADMIN"],
    //   },
    //   {
    //     id: "63d85d7193c8ae0f8f0839af",
    //     username: "Mr User",
    //     email: "moderator123@gmail.com",
    //     roles: ["ROLE_USER"],
    //   },
    //   {
    //     id: "63d85d7193c8ae0f8f0829af",
    //     username: "Mr Moderator",
    //     email: "moderator123@gmail.com",
    //     roles: ["ROLE_MODERATOR"],
    //   },
    //   {
    //     id: "63d85d7193c8ae0f8f0819af",
    //     username: "Mr Admin Two",
    //     email: "moderator123@gmail.com",
    //     roles: ["ROLE_MODERATOR"],
    //   },
    //   {
    //     id: "63d85d7193c8ae0f8f0849af",
    //     username: "Mr User two",
    //     email: "moderator123@gmail.com",
    //     roles: ["ROLE_USER"],
    //   },
    // ];

    var router = useRouter();

    var toggleCreateUser = () => {
      router.push("/createUser");
    };
    return { users, toggleCreateUser };
  },
};
</script>
