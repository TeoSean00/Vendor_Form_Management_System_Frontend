<template>
  <Navbar />
  Signed in as {{ currentUser }}
  <br />
  {{ newForm }}
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
          <template v-for="(section, index) in newForm" :key="index">
            <template v-for="(sectionData, i) in section" :key="i">
              <template v-for="sect in sectionData" :key="sect">
                {{ sect }}
                <FormSection :sectionData="sect" />
              </template>
            </template>
          </template>
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

export default {
  components: {
    Navbar,
    FormSection,
  },
  props: [],
  setup() {
    // Current user test
    var formID = "64099cb650fce16159f43ac6" //TEMP FORM ID. CHANGE TO NON HARDCODED
    var currentUser = ref("vendor");
    var content = ref("");
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
    var newForm = ref([]);
    function submitForm() {
      console.log(newForm.value);
      console.log("Form Submitted");
    }

    var loadForm = async (formID) => {
      console.log("Loading Form");
      await FormService.getForm(formID)
        .then((response) => {
          console.log("Loaded form is: ");
          console.log(response)
          var loadedForm = response
          // Other variables here etc vendorName = response.vendorName
          newForm.value = loadedForm.content.FormContent;
          // ADD THE OTHER FORM VARIABLES HERE
          console.log("New form is" + newForm);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadForm(formID);
    return {
      newForm,
      currentUser,
      submitForm,
      loadForm,
    };
  },
};
</script>
