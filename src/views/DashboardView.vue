<template>
  <Dashboard />
  {{ data }}
  {{ getValue }}
</template>

<script>
import Dashboard from "../components/dashboard/Dashboard.vue";

export default {
  setup() {
    // data syntax
    const data = ref({ 1: 1, 2: 2 }, ["hi"]);
    // method syntax
    const getValue = () => {
      pass;
    };
    return { getValue, data };
  },
};
</script>
