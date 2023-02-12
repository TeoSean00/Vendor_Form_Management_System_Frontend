<template>
  <div>
    <Navbar />

    <div class="row px-5 pt-3">
      <p class="text-secondary-blue">
        Welcome back, <span class="text-main-blue fw-bold">{{ user }}</span> !
      </p>
    </div>
    <AdminView />
    <div class="row"></div>
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>

    <div class="container">
      <div v-for="workflow in workflows" :key="workflow">
        <div class="text-main-blue workflow">
          <span class="hover" @click="toggleCollapse(workflow)">
            Workflow {{ workflow.workflowId }}
          </span>
        </div>
        <div
          v-for="form in workflow.forms"
          :key="form.formId"
          :class="{ collapse: !workflow.collapse }"
          class="list-group"
        >
          <div
            class="container my-2 form-option rounded-2 d-flex justify-content-between list-group-item list-group-item-action"
          >
            <div>
              <div>Form Id: {{ form.formId }}</div>
              <div>Form Name: {{ form.formName }}</div>
            </div>
            <div>Form Status: {{ form.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import UserService from "../services/userService";

import Navbar from "../components/navbar/Navbar.vue";
import TopBanner from "../components/navbar/TopBanner.vue";
import AdminView from "./AdminView.vue";

export default {
  components: {
    Navbar,
    TopBanner,
    AdminView,
  },
  setup() {
    var content = ref("");
    const user = ref("Admin XXX");
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

    function toggleCollapse(workflow) {
      workflow.collapse = !workflow.collapse;
      console.log("Toggle Collapse");
    }
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
    return { content, user, workflows, toggleCollapse: toggleCollapse };
  },
};
</script>
