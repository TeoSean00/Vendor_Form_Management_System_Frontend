<template>
  <div>
    <Navbar />

    <div class="row px-5 pt-3">
      <p class="text-secondary-blue">
        Welcome back,
        <span class="text-main-blue fw-bold">{{ currentUser.username }}</span> !
      </p>
    </div>
    <AdminView />
  </div>
</template>
<script>
import { ref } from "vue";
import UserService from "../services/userService";

import Navbar from "../components/navbar/Navbar.vue";
import TopBanner from "../components/navbar/TopBanner.vue";
import AdminView from "./AdminView.vue";

import { useAuthStore } from "../stores/authStore";

export default {
  components: {
    Navbar,
    TopBanner,
    AdminView,
  },
  setup() {
    var content = ref("");
    var workflows = ref([
      {
        workflowId: 1,
        forms: [
          {
            formId: 1,
            formName: "Form 1",
            status: "Pending",
          },
          {
            formId: 2,
            formName: "Form 2",
            status: "Pending",
          },
        ],
      },
      {
        workflowId: 2,
        forms: [
          {
            formId: 1,
            formName: "Form 1",
            status: "Pending",
          },
        ],
      },
      {
        workflowId: 3,
        forms: [
          {
            formId: 1,
            formName: "Form 1",
            status: "Pending",
          },
        ],
      },
      {
        workflowId: 4,
        forms: [
          {
            formId: 1,
            formName: "Form 1",
            status: "Pending",
          },
          {
            formId: 2,
            formName: "Form 2",
            status: "Pending",
          },
          {
            formId: 3,
            formName: "Form 3",
            status: "Pending",
          },
        ],
      },
    ]);

    var toggleCollapse = (workflow) => {
      workflow.collapse = !workflow.collapse;
      console.log("Toggle Collapse");
    };

    var auth = useAuthStore();
    var currentUser = auth.user;

    return { content, workflows, toggleCollapse, currentUser };
  },
};

</script>
