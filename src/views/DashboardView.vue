<template>
  <AdminHomeDashboard />
  <AdminVendorPageDashboard />
  <VendorHomeDashboard />
</template>

<script>
import AdminHomeDashboard from "../components/dashboard/AdminHomePage/AdminHomeDashboard.vue";
import AdminVendorPageDashboard from "../components/dashboard/AdminVendorPage/AdminVendorPageDashboard.vue";
import VendorHomeDashboard from "../components/dashboard/VendorHomePage/VendorHomeDashboard.vue";
import { ref } from "vue";

export default {
  components: {
    AdminHomeDashboard,
    AdminVendorPageDashboard,
    VendorHomeDashboard
  },
  setup() {

  },
};
</script>
