<template>
  <NavbarJP />
  <div class="container">
    <div class="row pt-3 mb-5">

      <div class="col-10">
        <h5 class="text-secondary-blue">
          Welcome back,
        <span class="text-main-blue fw-bold">{{ currentUser.username }}</span> !
      </h5>
      </div>

      <div class="col-2">

      <button class="btn btn-primary me-2" @click="toggleNewWorkflow">
        Create Workflow
      </button>
      </div>
      
    </div>
    
    <form action="">
      <div class="mb-3">
        <input type="text" class="p-3" v-model="searchName">
      </div>
    </form>

    <div class="list-group flex">
      
      <a v-for="workflow in workflows" :key="workflow" href="#" class="justify-content-between list-group-item list-group-item-action text-main-blue p-4 d-flex" aria-current="true">

        
        <span v-if="workflow.workflowName == null">
          <h3>Company {{ workflow.workflowId }}</h3>
        </span>
        <span v-else>
          <h3>{{ workflow.workflowName }}</h3>
        </span>
        <div class="float-right">
          <span class="badge bluebg mx-1 mt-2" >In Progress</span>
          <span class="badge text-bg-info">Total</span>
        </div>
        
      </a>
      
      
    </div>

  </div>




<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Assign Users</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul>
          <li  v-for="user in users" style="list-style-type: none;">
            <input :id="user" type="checkbox" :name="user"> {{ user.userName }}
          </li>
        </ul>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { ref } from "vue";
import NavbarJP from "../components/navbar/NavbarJP.vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

export default {
  components: { NavbarJP },
  setup() {
    var searchName = ""
    var users = ref([
      {
        userId: 1,
        userName: "John@gmail.com",
      },
      {
        userId: 2,
        userName: "Kevan",
      },
      {
        userId: 3,
        userName: "Johnson",
      },
      {
        userId: 4,
        userName: "Timbre",
      },
      {
        userId: 5,
        userName: "Jadon",
      },

    ])

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
    
    function showModalFn(){
      showModal = true;
      console.log("Shown Modal");
    }

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
      users,
      workflows,
      toggleCollapse,
      currentUser,
      toggleFormbuilder,
      toggleFormview,
      toggleNewWorkflow,
      toggleEditWorkflow,
      showModalFn,
      searchName
    };
  },
};
</script>
