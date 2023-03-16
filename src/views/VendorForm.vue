<template>
  <Navbar />
  Signed in as {{ currentUser }} displayRole is {{ displayRole }}
  <br />
  <!-- {{ newFormContent }} -->
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <!-- <div class="m-2">
          {{ templateData }}
        </div> -->
      <div class="form-floating m-4">
        <div class="">
          <h4>Form Details</h4>
          <button @click="testUser" class="btn btn-primary">Change user</button>
          <hr class="border border-dark border-2 mt-2 opacity-75" />
        </div>
        <form onsubmit="return false;">
          <template v-for="(section, index) in newFormContent" :key="index">
            <template v-for="(sectionData, i) in section" :key="i">
              <div v-if="displayRole == i">
                <template v-for="sect in sectionData" :key="sect">
                  <!-- {{ sect }} -->
                  <FormSection :sectionData="sect" />
                </template>
              </div>
            </template>
          </template>
          <button class="btn btn-secondary-blue me-2" @click="saveForm">
            Save Form
          </button>
          <button class="btn btn-primary" @click="submitForm">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/navbar/Navbar.vue";
import FormSection from "../components/form/FormSection.vue";
import FormService from "../services/form/formService";
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";

export default {
  components: {
    Navbar,
    FormSection,
  },
  props: [],
  setup() {
    // Current user test
    var formID = "6409371081ad093ae37ebee8"; //TEMP FORM ID. CHANGE TO NON HARDCODED
    var currentUser = ref(null);
    var displayRole = ref(false);

    var auth = useAuthStore();
    currentUser.value = auth.user;
    displayRole.value = auth.user.roles.includes("ROLE_ADMIN")
      ? "admin"
      : "vendor";
    // var newForm = ref([
    //   {
    //     admin: [
    //       { order: 0, label: "Admin header", style: "h1", type: "header" },
    //       { order: 1, label: "Admin text", input: "", type: "text" },
    //       { order: 2, label: "Admin Number", input: "", type: "number" },
    //       {
    //         order: 3,
    //         label: "Admin Boolean",
    //         input: [],
    //         options: ["Yes", "No"],
    //         type: "radio",
    //       },
    //       { order: 4, label: "Admin Date", input: "", type: "date" },
    //       {
    //         order: 5,
    //         label: "Admin Checkbox",
    //         input: [],
    //         options: ["Admin check 1", "Admin check 2"],
    //         type: "checkbox",
    //       },
    //       {
    //         order: 6,
    //         label: "Admin Radio",
    //         input: [],
    //         options: ["Admin radio 1", "Admin radio 2"],
    //         type: "radio",
    //       },
    //       {
    //         order: 7,
    //         label: "Admin likert ",
    //         input: [],
    //         options: ["admin likert 1", "Admin likert 2"],
    //         type: "likertGroup",
    //       },
    //     ],
    //   },
    //   {
    //     vendor: [
    //       { order: 0, label: "Vendor header", style: "h1", type: "header" },
    //       { order: 1, label: "Vendor text", input: "", type: "text" },
    //       { order: 2, label: "Vendor numn", input: "", type: "number" },
    //       {
    //         order: 3,
    //         label: "Vendor bool",
    //         input: [],
    //         options: ["Yes", "No"],
    //         type: "radio",
    //       },
    //       { order: 4, label: "Vendor date", input: "", type: "date" },
    //       {
    //         order: 5,
    //         label: "Vendor check ",
    //         input: [],
    //         options: ["Vendor cvhck 1", "Vendor chek 2"],
    //         type: "checkbox",
    //       },
    //       {
    //         order: 6,
    //         label: "Vendor radio",
    //         input: [],
    //         options: ["Vendor rad 1", "Vendor rad 2"],
    //         type: "radio",
    //       },
    //       {
    //         order: 7,
    //         label: "Vendor likert ",
    //         input: [],
    //         options: ["Vendor lik 1", "Vendor lik 2"],
    //         type: "likertGroup",
    //       },
    //     ],
    //   },
    // ]);
    var newFormContent = ref([]);
    function submitForm() {
      console.log(newFormContent.value);
      console.log("Form Submitted");
    }

    // Update Form
    var saveForm = async () => {
      loadedForm.value.content.FormContent = newFormContent.value;
      await FormService.updateForm("640c3ec1976af269ac9ce423", loadedForm.value)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    var loadedForm = ref(null);

    var loadForm = async (formID) => {
      console.log("Loading Form");
      await FormService.getForm(formID)
        .then((response) => {
          console.log("Loaded form is: ");
          console.log(response);
          loadedForm.value = response;
          // Other variables here etc vendorName = response.vendorName
          newFormContent.value = loadedForm.value.content.FormContent;
          // ADD THE OTHER FORM VARIABLES HERE
          console.log("New form is" + newFormContent);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadForm(formID);
    return {
      displayRole,
      saveForm,
      newFormContent,
      currentUser,
      submitForm,
      loadForm,
    };
  },
};
</script>
