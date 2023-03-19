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
            class="btn btn-primary mx-1"
            @click="saveForm()"
          >
            Save Form
          </button>
          <button
            v-if="formStatus == 'approver_response'"
            class="btn btn-danger mx-1"
            @click="submitForm('admin_response', 'reject')"
          >
            Reject Form
          </button>
          <button
            v-if="formStatus == 'approver_response'"
            class="btn btn-primary mx-1"
            @click="submitForm('form_completed', 'approve')"
          >
            Approve Form
          </button>
          <button
            v-if="formStatus == 'admin_response'"
            class="btn btn-danger mx-1"
            @click="submitForm('vendor_response', 'reject')"
          >
            Reject Form
          </button>
          <button
            v-if="formStatus == 'admin_response'"
            class="btn btn-primary mx-1"
            @click="submitForm('approver_response', 'approve')"
          >
            Submit for approval
          </button>
          <button
            v-if="formStatus == 'vendor_response'"
            class="btn btn-primary mx-1"
            @click="submitForm('admin_response', 'approve')"
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
import VendorService from "../services/vendor/vendorService";
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    Navbar,
    FormSection,
    toast
  },
  props: ['vendorFormId'],
  setup(props) {

    const currFormId = ref(props.vendorFormId);
    console.log("formDetails is", currFormId);
    
    var formID = ref(currFormId.value); //TEMP FORM ID. CHANGE TO NON HARDCODED
    // var formInfo = ref(null);
    // var getFormInfo = async () => {
    //   formInfo.value = await FormService.getForm(currFormId.value);
    //   console.log(formInfo.value.id);
    //   formID.value = formInfo.value.id;
    // };

    // getFormInfo();
  
    // Current user test
    var currentUser = ref("vendor");
    var newForm = ref([]);
    var formContent = ref([]);
    var formStatus = ref([]);

    var submitForm = async (status, action) => {
      var message = "";
      if (action == "reject") {
        message = "Form Rejected!"
      }
      else if (action == "approve") {
        message = "Form Approved!"
      }
      newForm.value.status = status;
      console.log(newForm);
      await FormService.updateForm(formID.value, newForm.value)
        .then((response) => {
          console.log("Submitted form is: ");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Form Submitted");
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    var loadedForm = ref(null);

    // Update Form
    var saveForm = async () => {
      await FormService.updateForm(formID.value, newForm.value)
        .then((response) => {
          console.log(response);
          toast.success("Form Saved!", {
            position: toast.POSITION.TOP_CENTER,
          });
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
      await FormService.getForm(formID.value)
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
      currFormId,
      
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
