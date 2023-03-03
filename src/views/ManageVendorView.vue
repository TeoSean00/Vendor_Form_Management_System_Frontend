<template>
  <NavbarJP />
  <div class="container">
    <div class="row pt-3 mb-3">

      <div class="col-10">
        <h5 class="text-secondary-blue">
          Welcome back,
        <span class="text-main-blue fw-bold">{{ currentUser.username }}</span> !
      </h5>
      </div>

      <div class="col-2">

      <button class="btn btn-primary" @click="toggleNewWorkflow">
        Add Vendor
      </button>
      </div>
      
    </div>
 
    <form action="">
      <div class="input-group mb-2">
        <span class="input-group-text bluebg text-light" @click="filter" id="basic-addon3">Search</span>
        <input v-model="searchName" type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
      </div>
    </form>

    <div v-if = "!searchName" class="list-group flex">
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
    <!-- <div v-else class="list-group flex">
      <a v-for="workflow in workflows"  href="#" class="justify-content-between list-group-item list-group-item-action text-main-blue p-4 d-flex" aria-current="true">

        
        <span v-if="workflow.workflowName.includes(searchName)" >
          <h3>{{workflow.workflowName}}</h3>
        </span>
        
        <div class="float-right">
          <span class="badge bluebg mx-1 mt-2" >In Progress</span>
          <span class="badge text-bg-info">Total</span>
        </div>
        
      </a>

    </div> -->
    {{ searchName }}
  </div>

<!-- {{workflow.forms._rawValue.length}} -->


<!-- Modal -->
<!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
</div> -->

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
        workflowName: "SMU",
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
      users,
      workflows,
      toggleCollapse,
      currentUser,
      toggleFormbuilder,
      toggleFormview,
      toggleNewWorkflow,
      toggleEditWorkflow,
      searchName,
    };
  },
};
</script>
