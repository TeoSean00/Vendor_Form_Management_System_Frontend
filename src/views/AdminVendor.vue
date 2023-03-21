<template>
  <Navbar />

  <section id="forms" class="forms mt-2">
    <div class="container">
      <!-- <div>
        Data dump section
        <p>{{ vendorUsers }}</p>
        <p>{{ vendorInfo }}</p>
        <p>{{ templateList }}</p>
        <p>{{ allForms }}</p>
        <p>{{ toDelete }}</p>
      </div> -->

      <div class="section-title d-flex justify-content-between">
        <div v-if="vendorInfo">
          <h1 class="text-main-blue">Vendor: {{ vendorInfo.name }}</h1>
          <h3 class="text-main-blue">Country: {{ vendorInfo.country }}</h3>
          <h3 class="text-main-blue">Details: {{ vendorInfo.details }}</h3>
        </div>
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
                      <tr v-for="(user, index) in vendorUsers" :key="user">
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
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="toggleCreateUserPage(vendorInfo.name, vendorInfo.id)"
          >
            Add Users
          </button>

          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="toggleFormBuilderPage(vendorInfo.name, vendorInfo.id)"
          >
            Add Form
          </button>
        </div>
      </div>

      <!-- container for the dashboards pertaining to this particular vendor in admin's view, passing of this vendor details over to dashboards too -->
      <div class="container mt-5">
        <div class="row">
          <div class="col">
            <FormStatusBarChart :vendorDetails="vendorInfo" />
          </div>
          <div class="col">
            <UpdatesTodayChart :vendorDetails="vendorInfo" />
          </div>
          <div class="col">
            <DeadlinesChart :vendorDetails="vendorInfo" />
          </div>
        </div>
      </div>

      <!-- start vendor assigned form -->
      <div class="bluebg card text-white mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">
            Assigned (Vendor fill in Stage) | Waiting for vendor response
          </h4>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <template
          v-for="vendorForm in vendorAssignedForms"
          :key="vendorForm.status"
        >
          <FormCard
            :dateCreated="vendorForm.createDate"
            :deadline="vendorForm.deadline"
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
      </div>
      <!-- end of vendor assigned form  -->

      <!-- start admin assigned form -->
      <div class="bluebg card text-white mt-5 mb-4 py-2 text-center">
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
          <FormCard
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
      </div>
      <!-- end of admin assigned form  -->

      <!-- start approval assigned form -->
      <div class="bluebg card text-white mt-5 mb-4 py-2 text-center">
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
          <FormCard
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
      </div>
      <!-- end of approval assigned form  -->

      <!-- start completed assigned form -->
      <div class="bluebg card text-white mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">Completed Forms</h4>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <template v-for="vendorForm in completedForms" :key="vendorForm.status">
          <FormCard
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            :formStatus="vendorForm.status"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
        <div class="col mt-4"></div>
      </div>
      <!-- end of completed assigned form  -->

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
    </div>
  </section>
</template>

<script>
import TemplateList from "../components/template/TemplateList.vue";
import Navbar from "../components/navbar/NavbarJP.vue";
import UserService from "../services/user/userService";
import FormComponent from "../components/form/FormComponent.vue";
import SectionComponent from "../components/form/SectionComponent.vue";
import FormCard from "../components/form/FormCard.vue";
import { useTemplateStore } from "../stores/templateStore";
import { onMounted, ref, watch } from "vue";
import VendorService from "../services/vendor/vendorService";
import FormService from "../services/form/formService";
import { useRouter } from "vue-router";
import DeadlinesChart from "../components/dashboard/AdminVendorPage/DeadlinesChart.vue";
import FormStatusBarChart from "../components/dashboard/AdminVendorPage/FormStatusBarChart.vue";
import UpdatesTodayChart from "../components/dashboard/AdminVendorPage/UpdatesTodayChart.vue";

export default {
  components: {
    Navbar,
    FormComponent,
    TemplateList,
    SectionComponent,
    FormCard,
    DeadlinesChart,
    FormStatusBarChart,
    UpdatesTodayChart,
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
    console.log("After getVendorInfo() called> ", vendorInfo);

    var vendorUsers = ref([]);
    var getUserInfo = async () => {
      console.log("vendorinfo vendorId is", currId);
      vendorUsers.value = await UserService.getVendorUsers(currId.value);
    };
    getUserInfo();

    var allForms = ref([]);
    var vendorAssignedForms = ref([]);
    var adminAssignedForms = ref([]);
    var approvalAssignedForms = ref([]);
    var completedForms = ref([]);

    var getAllForms = async () => {
      allForms.value = await FormService.getVendorForms(currId.value);
      console.log("hi" + allForms.value[0].vendorId);
      for (var i = 0; i < allForms.value.length; i++) {
        if (allForms.value[i].status == "vendor_response") {
          vendorAssignedForms.value.push(allForms.value[i]);
        } else if (allForms.value[i].status == "admin_response") {
          adminAssignedForms.value.push(allForms.value[i]);
        } else if (allForms.value[i].status == "approver_response") {
          approvalAssignedForms.value.push(allForms.value[i]);
        } else if (allForms.value[i].status == "form_completed") {
          completedForms.value.push(allForms.value[i]);
        }
      }
    };
    getAllForms();

    var toDelete = ref("");
    function upToDelete(vendorFormId) {
      toDelete.value = vendorFormId;
    }

    const router = useRouter();
    function enterForm(vendorFormId) {
      console.log("enter form is " + vendorFormId);
      router.push({
        path: "/vendorForm",
        query: {
          vendorFormId: vendorFormId,
        },
      });
    }

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

    const toggleCreateUserPage = (vendorName, vendorId) => {
      router.push({
        name: "createUser",
        params: {
          name: vendorName,
        },
        query: {
          vendorId: vendorId,
        },
      });
    };

    const toggleFormBuilderPage = (vendorName, vendorId) => {
      router.push({
        name: "formbuilder",
        params: {
          name: vendorName,
        },
        query: {
          vendorId: vendorId,
        },
      });
    };

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
      completedForms,
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
      upToDelete,
      enterForm,
      toggleCreateUserPage,
      toggleFormBuilderPage,
    };
  },
};
</script>
