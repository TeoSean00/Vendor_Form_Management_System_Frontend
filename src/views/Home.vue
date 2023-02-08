<template>
  <div >
    <div class="row">
      <div class="col-12 bg-main-blue">
        <h1>Hello this is in home</h1>
      </div>
    </div>
    <!-- <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header> -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import UserService from "../services/userService";

import Navbar from "../components/Navbar.vue";
import TopBanner from "../components/TopBanner.vue";


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
