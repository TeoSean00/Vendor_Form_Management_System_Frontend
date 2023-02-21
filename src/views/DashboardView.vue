<template>
    <Dashboard />
    {{ data }}
    {{ getValue }}
</template>

<script>
import { Dashboard } from "../components/Dashboard.vue";

export default {
  setup() {
    // data syntax
    const data = ref(
      {1:1,
      2:2},
      ['hi'],
    )



    // method syntax
    const getValue = () => {
      pass
    }



    return { getValue, data }
    // var content = ref("");

    // UserService.getPublicContent().then(
    //   (response) => {
    //     content.value = response.data;
    //   },
    //   (error) => {
    //     content.value =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
    // return { content };
  },
};
</script>