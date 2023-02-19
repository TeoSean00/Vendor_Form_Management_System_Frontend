<template>
  <Navbar />
  <div class="container">
    <div class="row px-5 pt-3">
      <p class="text-secondary-blue">
        Welcome back,
        <span class="text-main-blue fw-bold">{{ currentUser.username }}</span> !
      </p>
    </div>

    <div v-for="workflow in workflows" :key="workflow">
      <div class="text-main-blue workflow d-flex justify-content-between">
        <span class="hover" @click="toggleCollapse(workflow)">
          <span v-if="workflow.workflowName == null">
            Workflow {{ workflow.workflowId }}
          </span>
          <span v-else>
            {{ workflow.workflowName }}
          </span>
        </span>
        <div>
          ADD ASSIGN BUTTON (Make it a popup)
          <font-awesome-icon
            icon="pen-to-square"
            class="hover mx-2 mt-1"
            @click="toggleEditWorkflow(workflow)"
          />
          <font-awesome-icon
            icon="plus"
            class="hover mx-2 mt-1"
            @click="toggleFormbuilder"
          />
        </div>
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

    <div class="p-3">
      <button class="btn btn-primary me-2" @click="toggleFormview">
        View Templates
      </button>
      <button class="btn btn-primary me-2" @click="toggleNewWorkflow">
        Create Workflow
      </button>
      <button class="btn btn-primary" @click="toggleFormbuilder">
        Create Form
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Navbar from "../components/navbar/Navbar.vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

export default {
  components: { Navbar },
  setup() {
    var workflows = ref([
      {
        workflowId: 1,
        workflowName: "Test Workflow Name",
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
        workflowName: null,
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
        workflowName: null,
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
        workflowName: null,
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

    var auth = useAuthStore();
    var currentUser = ref(auth.user);

    const router = useRouter();

    const toggleFormbuilder = () => {
      router.push("/formbuilder");
    };

    const toggleFormview = () => {
      router.push("/viewform");
    };

    const toggleNewWorkflow = () => {
      var newWorkflow = {
        workflowId: workflows._rawValue.length + 1,
        forms: [],
      };
      workflows.value.push(newWorkflow);
    };

    const toggleEditWorkflow = (workflow) => {
      console.log(workflow.workflowId);
      var newName = prompt("Enter new workflow name!");
      workflow.workflowName = newName;
    };

    return {
      workflows,
      toggleCollapse,
      currentUser,
      toggleFormbuilder,
      toggleFormview,
      toggleNewWorkflow,
      toggleEditWorkflow,
    };
  },
};
</script>
