<template>
  <div class="container">
    <Dashboard />
    <div class="container">
      <div class="row mt-4">
        <button class="btn btn-primary" @click="toggleWorkflow">
          Manage Vendors
        </button>
        <button class="btn btn-success" @click="toggleUserView">
          Manage Users
        </button>
        <button class="btn btn-secondary-blue" @click="toggleFormBuilder">
          Manage Templates
        </button>
      </div>
    </div>
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
