<template><Navbar />VENDOR PAGE HERE{{ auth }}{{ vendorInfo }}</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import { useAuthStore } from "../stores/authStore";
import VendorService from "../services/vendor/vendorService";
import { ref } from "vue";

export default {
  components: { Navbar },
  setup() {
    var auth = useAuthStore();
    var currentUser = auth.user;

    var vendorInfo = ref(null);
    var getVendorInfo = async () => {
      vendorInfo.value = await VendorService.getVendor(currentUser.vendorId);
    };
    getVendorInfo();

    return { auth, vendorInfo };
  },
};
</script>
