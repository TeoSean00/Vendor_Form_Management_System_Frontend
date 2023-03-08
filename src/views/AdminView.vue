<template>
  <div class="container">
    <Dashboard />
    <div class="container">
      <div class="row mt-4">
        <button class="btn btn-primary">Manage Vendors</button>
        <button class="btn btn-success">Manage Vendors</button>
        <button class="btn btn-background">Manage Vendors</button>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "../components/admin/Dashboard.vue";
export default {
  components: { Dashboard },
  setup() {},
};
</script>
