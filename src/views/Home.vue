<template>
  <div >
      <Navbar/>
      <div class="row px-5 pt-3">
        <p class="text-secondary-blue">Welcome back, <span class="text-main-blue fw-bold">{{ user }}</span> !</p>
      </div>
      <div class="row"></div>

    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
<script setup>
import { ref } from "vue";
import UserService from "../services/userService";

import Navbar from "../components/Navbar.vue";
import TopBanner from "../components/TopBanner.vue";

const user = "Admin XXX";

// export default {
//   setup() {
//     var content = ref("");

//     UserService.getPublicContent().then(
//       (response) => {
//         content.value = response.data;
//       },
//       (error) => {
//         content.value =
//           (error.response && error.response.data) ||
//           error.message ||
//           error.toString();
//       }
//     );
//     components: {
//       Navbar;
//       TopBanner;
//     }
 
//     return { content };
//   },
// };
</script>
t
