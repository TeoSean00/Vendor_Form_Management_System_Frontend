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
          <span> Form Status: {{ formStatus }} </span>
          <hr class="border border-dark border-2 mt-2 opacity-75" />
        </div>
        <form onsubmit="return false;">
          <template v-for="(section, index) in formContent" :key="index">
            <template v-for="(sectionData, i) in section" :key="i">
              <h1>{{ i }} Section</h1>
              <template v-for="sect in sectionData" :key="sect">
                {{ sect }}
                <FormSection :sectionData="sect" />
              </template>
            </template>
          </template>
          <button
            v-if="formStatus == 'approver_response'"
            class="btn btn-danger mx-1"
            @click="submitForm('admin_response')"
          >
            Reject Form
          </button>
          <button
            v-if="formStatus == 'approver_response'"
            class="btn btn-primary mx-1"
            @click="submitForm('form_completed')"
          >
            Approve
          </button>
          <button
            v-if="formStatus == 'admin_response'"
            class="btn btn-danger mx-1"
            @click="submitForm('vendor_response')"
          >
            Reject Form
          </button>
          <button
            v-if="formStatus == 'admin_response'"
            class="btn btn-primary mx-1"
            @click="submitForm('approver_response')"
          >
            Submit for approval
          </button>
          <button
            v-if="formStatus == 'vendor_response'"
            class="btn btn-primary mx-1"
            @click="submitForm('admin_response')"
          >
            Submit to admin
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/navbar/NavbarJP.vue";
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
    var formID = "640d327ba8affc65fb420b19"; //TEMP FORM ID. CHANGE TO NON HARDCODED
    var currentUser = ref("vendor");
    var newForm = ref([]);
    var formContent = ref([]);
    var formStatus = ref([]);

    var submitForm = async (status) => {
      newForm.value.status = status;
      console.log(newForm);
      await FormService.updateForm(formID, newForm.value)
        .then((response) => {
          console.log("Submitted form is: ");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Form Submitted");
    };

    var loadedForm = ref(null);

    // Update Form
    var saveForm = async () => {
      await FormService.updateForm("640c3ec1976af269ac9ce423", newForm.value)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // get the roles
    var displayRole = ref(null);
    var auth = useAuthStore();
    displayRole.value = auth.user;

    var loadForm = async (formID) => {
      console.log("Loading Form");
      await FormService.getForm(formID)
        .then((response) => {
          console.log("Loaded form is: ");
          console.log(response);
          newForm.value = response;
          formContent.value = newForm.value.content.FormContent;
          formStatus.value = newForm.value.status;
          // var loadedForm = response
          // formStatus.value = loadedForm.status
          // // Other variables here etc vendorName = response.vendorName
          // newForm.value = loadedForm.content.FormContent;
          // ADD THE OTHER FORM VARIABLES HERE
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadForm(formID);
    return {
      displayRole,
      saveForm,
      currentUser,
      submitForm,
      loadForm,
      formContent,
      formStatus,
    };
  },
};
</script>
