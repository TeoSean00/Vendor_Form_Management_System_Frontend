<template>
  <div class="container">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "../components/admin/Dashboard.vue";
import { useRouter } from "vue-router";

export default {
  components: { Dashboard },
  setup() {
    const router = useRouter();

    const toggleWorkflow = () => {
      router.push("/vendors");
    };

    const toggleUserView = () => {
      router.push("/users");
    };

    const toggleFormBuilder = () => {
      router.push("/formbuilder");
    };

    return { toggleWorkflow, toggleUserView, toggleFormBuilder };
  },
};
</script>
