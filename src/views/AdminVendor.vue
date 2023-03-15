<template>
  <Navbar />

  <section id="forms" class="forms">
    <div class="container">
      <div>
        Data dump section
        <p>{{ vendorUsers }}</p>
        <p>{{ vendorInfo }}</p>
        <p>{{ templateList }}</p>
        <p>{{ allForms }}</p>
        <p>{{ toDelete }}</p>
      </div>

      <div class="section-title d-flex justify-content-between">
        <h1 v-if="vendorInfo" class="text-main-blue">{{ vendorInfo.name }}</h1>
        <div
          class="btn-group mt-auto shadow-0"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="modal"
            href="#allusers"
          >
            All Users
          </button>

          <div
            class="modal fade"
            id="allusers"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabindex="-1"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="allusersLabel">List of Users</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body" id="usermodal">
                  <table
                    class="table align-middle mb-0 bg-white"
                    id="usertable"
                  >
                    <thead class="bg-light">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user,index in vendorUsers" :key="user">

                        <td>
                          <p class="fw-normal mb-1">{{ ++index }}</p>
                        </td>
                        <td>
                          <p class="fw-bold mb-1">{{ user.username }}</p>
                          <p class="text-muted mb-0">{{ user.email }}</p>
                        </td>

                      </tr>   
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-primary"
                    data-bs-target="#addusers"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Add users
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div
            class="modal fade"
            id="addusers"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabindex="-1"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addusersLabel">Add users</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body text-center">
                  <input
                    class="form-control"
                    list="datalistOptions"
                    id="users"
                    placeholder="Type to search..."
                  />
                  <datalist id="datalistOptions">
                    <option value="john"></option>
                    <option value="Mary"></option>
                    <option value="may"></option>
                    <option value="ss"></option>
                    <option value="iii"></option>
                  </datalist>

                  <button
                    class="btn btn-outline-primary mt-3 px-5"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    @click="addUsers"
                  >
                    Add
                  </button>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    data-bs-target="#allusers"
                  >
                    See users
                  </button>
                </div>
              </div>
            </div>
          </div> -->

          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="modal"
            href="#addusers"
          >
            Add Users
          </button>

          <div class="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add Forms
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <li>
                <a class="dropdown-item" href="/formbuilder">Create new form</a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#templatelist"
                  >Choose from templates</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Modal for templates -->
      <div
        class="modal fade"
        id="templatelist"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="choosetemplateLabel">
                Choose Template
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" id="templatemodal">
              <div class="box">
                <div class="container">
                  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Add template
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card text-white bg-primary mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">
            Assigned (Vendor fill in Stage) | Waiting for vendor response
          </h4>
        </div>
      </div>

      <!-- start of form -->
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <template
          v-for="vendorForm in vendorAssignedForms"
          :key="vendorForm.status"
        >
          <FormCard :vendorFormId="vendorForm.id" :formInfo="vendorForm.status" @upToDelete="upToDelete"></FormCard>
        </template>
        <!-- <template
          v-for="vendorForm in vendorAssignedForms"
          :key="vendorForm.status"
        >
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="card-title">{{ vendorForm.id }}</h2>
                <p class="card-text">
                  Form description: <br />
                  {{ vendorForm.content.FormInfo }}
                </p>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-6 pr-0">
                    <button class="btn btn-link btn-block">Enter</button>
                  </div>
                  
                  <div class="col-6 pl-0">
                    <button
                      class="btn btn-link btn-block"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmModal"
                      @click="toDelete = vendorForm.id"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template> -->
      </div>
      <!-- end of form  -->

      <div class="card text-white bg-primary mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">
            Awaiting Evaluation (Admin stage) | Waiting for both admin to fill
            and evaluate
          </h4>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <template
          v-for="vendorForm in adminAssignedForms"
          :key="vendorForm.status"
        >
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="card-title">{{ vendorForm.id }}</h2>
                <p class="card-text">
                  Form description: <br />
                  {{ vendorForm.content.FormInfo.templateDesc }}
                </p>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-6 pr-0">
                    <button class="btn btn-link btn-block">Enter</button>
                  </div>

                  <div class="col-6 pl-0">
                    <button
                      class="btn btn-link btn-block"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmModal"
                      @click="toDelete = vendorForm.id"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="card text-white bg-primary mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">
            Awaiting Approval (approver stage) | Waiting for approval to
            approve, completed / rejected
          </h4>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <template
          v-for="vendorForm in approvalAssignedForms"
          :key="vendorForm.status"
        >
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="card-title">{{ vendorForm.id }}</h2>
                <p class="card-text">
                  Form description: <br />
                  {{ vendorForm.content.FormInfo.templateDesc }}
                </p>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-6 pr-0">
                    <button class="btn btn-link btn-block">Enter</button>
                  </div>

                  <div class="col-6 pl-0">
                    <button
                      class="btn btn-link btn-block"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmModal"
                      @click="toDelete = vendorForm.id"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="col mt-4"></div>
      </div>

      <!-- Modal confirm delete -->
      <div
        class="modal fade"
        id="confirmModal"
        tabindex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmModalLabel">Are you sure?</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              Do you really want to delete these records? <br />This process
              cannot be undone.
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="deleteForm(toDelete)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- empty column -->
    </div>
  </section>
</template>

<script>
import TemplateList from "../components/template/TemplateList.vue";
import Navbar from "../components/navbar/Navbar.vue";
import UserService from "../services/user/userService";
import FormComponent from "../components/form/FormComponent.vue";
import SectionComponent from "../components/form/SectionComponent.vue";
import FormCard from "../components/form/FormCard.vue";
import { useTemplateStore } from "../stores/templateStore";
import { onMounted, ref, watch } from "vue";
import VendorService from "../services/vendor/vendorService";
import FormService from "../services/form/formService";


export default {
  components: {
    Navbar,
    FormComponent,
    TemplateList,
    SectionComponent,
    FormCard
  },
  props: ["vendorId"],
  setup(props) {
    const currId = ref(props.vendorId);
    console.log("vendorDetails is", currId);

    var vendorInfo = ref(null);
    var getVendorInfo = async () => {
      vendorInfo.value = await VendorService.getVendor(currId.value);
    };

    getVendorInfo();
    console.log(vendorInfo);

    var vendorUsers = ref([]);
    var getUserInfo = async () => {
      console.log("vendorinfo vendorId is", currId);
      vendorUsers.value = await UserService.getVendorUsers(currId.value);
    };
    getUserInfo();

    var allForms = ref([]);
    var vendorForms = ref([]);
    var vendorAssignedForms = ref([]);
    var adminAssignedForms = ref([]);
    var approvalAssignedForms = ref([]);

    var getAllForms = async () => {
      allForms.value = await FormService.getForms();
      console.log("hi" + allForms.value[0].vendorId);
      for (var i = 0; i < allForms.value.length; i++) {
        if (allForms.value[i].vendorId == currId.value) {
          vendorForms.value.push(allForms.value[i]);
          if (allForms.value[i].status == "vendor_response") {
            vendorAssignedForms.value.push(allForms.value[i]);
          } else if (allForms.value[i].status == "admin_response") {
            adminAssignedForms.value.push(allForms.value[i]);
          } else if (allForms.value[i].status == "approval_response") {
            approvalAssignedForms.value.push(allForms.value[i]);
          }
        }
      }
    };
    getAllForms();

    var toDelete = ref("");
    function upToDelete(vendorFormId) {
      toDelete.value = vendorFormId; 
    };

    var content = ref("");

    UserService.getUserBoard().then(
      (response) => {
        content.value = response.data;
        console.log("Userboard response is " + response.data);
      },
      (error) => {
        content.value =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

    //get template data from templatestore
    var templateStore = useTemplateStore();
    var templateList = ref([]);
    templateStore.getTemplates();

    watch(templateStore.$state, (state) => {
      console.log("CHANGE DETECTED", state);
      templateList.value = state.templates;
    });

    var formName = ref("");
    var assignedTo = ref("Vendor");
    var desc = ref("Enter form description here.");
    var formItems = ref([]);
    var formSections = ref([]);

    var addAdminSection = () => {
      formSections.value.push({
        admin: [],
      });
    };
    var addVendorSection = () => {
      formSections.value.push({
        vendor: [],
      });
    };

    function addTextInput() {
      formItems.value.push({
        type: "text",
        order: formItems.value.length,
        text: "",
      });
    }
    function addCheckboxInput() {
      formItems.value.push({
        type: "checkbox",
        order: formItems.value.length,
        text: "",
        options: [],
      });
    }
    function addRadioInput() {
      formItems.value.push({
        type: "radio",
        order: formItems.value.length,
        text: "",
        options: [],
      });
    }
    function addHeaderText() {
      formItems.value.push({
        type: "header",
        order: formItems.value.length,
        text: "",
        style: "h1",
      });
    }
    function addBooleanInput() {
      formItems.value.push({
        type: "boolean",
        order: formItems.value.length,
        text: "",
      });
    }
    function addDateInput() {
      formItems.value.push({
        type: "date",
        order: formItems.value.length,
        text: "",
      });
    }
    function addNumberInput() {
      formItems.value.push({
        type: "number",
        order: formItems.value.length,
        text: "",
      });
    }
    function addLikertGroupInput() {
      formItems.value.push({
        type: "likertGroup",
        order: formItems.value.length,
        text: "",
        options: [],
      });
    }

    var addTemplate = (template) => {
      // console.log("template received is", template);
      for (let i = 0; i < template.templateContents.length; i++) {
        var section = template.templateContents[i];
        formSections.value.push(section);
        // let key = Object.keys(section)[0];
        // console.log(section[key]);
        // section[key].forEach((element) => {
        //   formItems.value.push(element);
        // });
      }
    };

    function update() {
      //Uncomment this out to check
      console.log("parent checking the state of the form", formSections);
    }

    // Text, Text,  Radio
    // Text, Radio
    function removeQuestion(questionKey) {
      //Remove from formItems first
      formItems.value.splice(questionKey, 1);
    }

    function deleteForm(toDelete) {
      FormService.deleteForm(toDelete);
      console.log("Form deleted");
    }

    function exportForm() {
      //Packages the form content into a JSON string
      //This is where we write the ajax code
      const outputObj = {
        templateInfo: {
          templateName: formName.value,
          assignedTo: assignedTo.value,
          templateDesc: desc.value,
        },
        templateContents: formSections.value,
      };

      console.log(outputObj);
      const outputJson = JSON.stringify(outputObj);
      console.log(outputJson);

      //for adding template to mongoDB
      // templates.addTemplate(outputObj);
      // console.log("-----------------------------------------");
      // console.log("Form has been exported, details below:");
      // console.log("Form name: " + formName.value);
      // console.log("Form assigned to: " + assignedTo.value);
      // console.log("Form desc: " + desc.value);
      // console.log("--------------Form Contents--------------");
      // console.log(formItems.value);
      // console.log("-----------------------------------------");
    }

    return {
      vendorUsers,
      vendorInfo,
      currId,
      templateList,
      content,
      formItems,
      formName,
      assignedTo,
      desc,
      formSections,
      allForms,
      vendorAssignedForms,
      adminAssignedForms,
      approvalAssignedForms,
      toDelete,
      addTextInput,
      addHeaderText,
      addCheckboxInput,
      addRadioInput,
      addBooleanInput,
      addDateInput,
      addNumberInput,
      addLikertGroupInput,
      update,
      removeQuestion,
      deleteForm,
      exportForm,
      addTemplate,
      addAdminSection,
      addVendorSection,
      upToDelete
    };
  },
};
</script>
