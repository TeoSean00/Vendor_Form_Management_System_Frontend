<template>
  <Navbar />
  <!-- Signed in as {{ currentUser }} displayRole is {{ displayRole }} has {{ role }} -->
  <br />
  <br />
  <div>
    {{ newForm }}
  </div>

  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <!-- <div class="m-2">
          {{ templateData }}
        </div> -->
      <div class="form-floating m-4">
        <div class="">
          <h4>Form Details</h4>
          <span>
            Form Status:
            <template v-if="formStatus == 'vendor_response'">
              Waiting for Vendor to submit form to Admin
            </template>
            <template v-if="formStatus == 'admin_response'">
              Waiting for Admin to review form
            </template>
            <template v-if="formStatus == 'approver_response'">
              Waiting for Approver to review form
            </template>
          </span>
          <br />
          <span> Revision Number: {{ revNumber }} </span>
          <hr class="border border-dark border-2 mt-2 opacity-75" />
        </div>
        <!-- <div>
          {{ formContent }}
        </div> -->
        <form onsubmit="return false;">
          <template v-for="(section, index) in formContent" :key="index">
            <template v-for="(sectionData, i) in section" :key="i">
              <!-- Moderator can view all but edit nothing -->
              <template v-if="role.includes('ROLE_MODERATOR')">
                <h2 class="mt-4">{{ i.charAt(0).toUpperCase() + i.slice(1) }} Section</h2>
                <template v-for="sect in sectionData" :key="sect">
                  <!-- {{ sect }} -->
                  <FormSection :sectionData="sect" :disabled="true" />
                </template>
              </template>

              <template v-else>
                <!-- To allow admin to view admin part and fill in -->
                <template v-if="i == 'admin' && role.includes('ROLE_ADMIN')">
                  <h2 class="mt-4">{{ i.charAt(0).toUpperCase() + i.slice(1) }} Section</h2>
                  <template v-for="sect in sectionData" :key="sect">
                    <!-- {{ sect }} -->
                    <FormSection :sectionData="sect" :disabled="false" />
                  </template>
                </template>
                <!-- To allow admin to view vendor part but not fill in -->
                <template v-if="i == 'vendor' && role.includes('ROLE_ADMIN')">
                  <h2 class="mt-4">{{ i.charAt(0).toUpperCase() + i.slice(1) }} Section</h2>
                  <template v-for="sect in sectionData" :key="sect">
                    <!-- {{ sect }} -->
                    <FormSection :sectionData="sect" :disabled="true" />
                  </template>
                </template>
                <!-- To allow vendor to view vendor part only -->
                <template
                  v-if="
                    i == 'vendor' &&
                    role.includes('ROLE_USER') &&
                    formStatus == 'vendor_response'
                  "
                >
                  <h2 class="mt-4">{{ i.charAt(0).toUpperCase() + i.slice(1) }} Section</h2>
                  <template v-for="sect in sectionData" :key="sect">
                    <!-- {{ sect }} -->
                    <FormSection :sectionData="sect" :disabled="false" />
                  </template>
                </template>
                <!-- To allow vendor to view vendor part BUT not edit if it has been submitted -->
                <template
                  v-if="
                    i == 'vendor' &&
                    role.includes('ROLE_USER') &&
                    formStatus !== 'vendor_response'
                  "
                >
                  <h2 class="mt-4">{{ i.charAt(0).toUpperCase() + i.slice(1) }} Section</h2>
                  <template v-for="sect in sectionData" :key="sect">
                    <!-- {{ sect }} -->
                    <FormSection :sectionData="sect" :disabled="true" />
                  </template>
                </template>
              </template>
            </template>
          </template>
          <button
            v-if="
              (formStatus == 'admin_response' &&
                role.includes('ROLE_ADMIN') &&
                !role.includes('ROLE_MODERATOR')) ||
              (formStatus == 'vendor_response' && !role.includes('ROLE_ADMIN'))
            "
            class="btn btn-primary mx-1"
            @click="saveForm()"
            type="submit"
          >
            Save Form
          </button>
          <!-- Approver response to admin response -->
          <button
            v-if="
              formStatus == 'approver_response' &&
              role.includes('ROLE_MODERATOR')
            "
            class="btn btn-danger mx-1"
            @click="submitForm('admin_response', 'reject')"
          >
            Reject Form
          </button>
          <!-- Approver response to complete form -->
          <button
            v-if="
              formStatus == 'approver_response' &&
              role.includes('ROLE_MODERATOR')
            "
            class="btn btn-primary mx-1"
            @click="submitForm('form_completed', 'approve')"
          >
            Approve Form
          </button>
          <!-- Admin response to vendor response -->
          <button
            v-if="formStatus == 'admin_response' && role.includes('ROLE_ADMIN')"
            class="btn btn-danger mx-1"
            data-bs-toggle="modal"
            data-bs-target="#setDeadline"
          >
            Reject Form
          </button>
          <!-- Admin response to approver response -->
          <button
            v-if="formStatus == 'admin_response' && role.includes('ROLE_ADMIN')"
            class="btn btn-primary mx-1"
            @click="submitForm('approver_response', 'approve')"
          >
            Submit for approval
          </button>
          <!-- Vendor response to admin response    -->
          <button
            v-if="formStatus == 'vendor_response' && role.includes('ROLE_USER')"
            class="btn btn-primary mx-1"
            @click="submitForm('admin_response', 'approve')"
          >
            Submit to admin
          </button>

          <!-- <testEmail :vendorName="newForm.vendorName" :formDueDate="newForm.deadline"/> -->
 
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="setDeadline"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Set New Deadline
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label class="form-label">Select date here</label>
          <hr />
          <input
            type="date"
            id="deadline"
            name="form-deadline"
            class="mb-3"
            v-model.lazy="formDeadline"
          />
          <div v-if="formDeadline" class="alert alert-warning" role="alert">
            You selected {{ formDeadline }}
          </div>
          <div v-if="createFormError" class="alert alert-danger" role="alert">
            {{ createFormError }}
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
            :data-bs-dismiss="
              (formDeadline != null) & (Date.parse(formDeadline) > Date.now())
                ? 'modal'
                : ''
            "
            @click="submitForm('vendor_response', 'reject')"
          >
            Create form
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
body {background-color : F7F7F7}

</style>
<script>
import Navbar from "../components/navbar/NavbarJP.vue";
import FormSection from "../components/form/FormSection.vue";
import FormService from "../services/form/formService";
import VendorService from "../services/vendor/vendorService";
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import testEmail from "../components/admin/components/TestEmail.vue";
import router from "../router/index";

export default {
  components: {
    Navbar,
    FormSection,
    toast,
    testEmail,
  },
  props: ["vendorFormId"],
  setup(props) {
    const currFormId = ref(props.vendorFormId);
    console.log("formDetails is", currFormId);

    var vendorName = ref("");
    var formDueDate = ref("");
    var formID = ref(currFormId.value); //TEMP FORM ID. CHANGE TO NON HARDCODED
    // var formInfo = ref(null);
    // var getFormInfo = async () => {
    //   formInfo.value = await FormService.getForm(currFormId.value);
    //   console.log(formInfo.value.id);
    //   formID.value = formInfo.value.id;
    // };

    // getFormInfo();

    var getDate = () => {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // Current user test
    var createFormError = ref(null);
    var currentUser = ref("vendor");
    var newForm = ref([]);
    var formContent = ref([]);
    var formStatus = ref([]);
    var revNumber = ref(null);
    var formDeadline = ref(null);
    var submitForm = async (status, action) => {
      var message = "";
      if (action == "reject") {
        message = "Form Rejected!";
        if (newForm.value.status == "admin_response") {
          if (formDeadline.value == null) {
            createFormError.value = "Please select a date";
            return;
          }
          let deadlineDate = Date.parse(formDeadline.value);
          let todayDate = Date.now();

          if (deadlineDate < todayDate) {
            createFormError.value =
              "Your date cannot be earlier than " + getDate();
            return;
          }
          createFormError.value = null;
          newForm.value.deadline = formDeadline.value;
          newForm.value.revNumber = newForm.value.revNumber + 1;
        }
      } else if (action == "approve") {
        if (!formValidator()) {
          console.log("Form not filled");
          return;
        }
        message = "Form Submitted!";
      }
      newForm.value.status = status;
      console.log("FORM IS ");
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
        pauseOnHover: false,
        autoClose: 2000,
      });
      router.push({ path: "/" });
    };

    var loadedForm = ref(null);

    // Update Form
    var saveForm = async () => {
      await FormService.updateForm(formID.value, newForm.value)
        .then((response) => {
          console.log(response);
          toast.success("Form Saved!", {
            position: toast.POSITION.TOP_CENTER,
            pauseOnHover: false,
            autoClose: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
        if (role.includes("ROLE_USER")) {
          router.push({ path: '/vendorView' })
        }
        else{
          router.push({ path: '/' })
        }
        
    };

    // get the roles
    var displayRole = ref(null);
    var auth = useAuthStore();
    displayRole.value = auth.user;
    var role = displayRole.value.roles;
    // hardcoded for now
    // var role = ref(["ROLE_USER"])
    // var role = ref(["ROLE_USER", "ROLE_ADMIN"])
    // var role = ref(["ROLE_USER", "ROLE_ADMIN", "ROLE_MODERATOR"])

    var loadForm = async (formID) => {
      console.log("Loading Form");
      await FormService.getForm(formID.value)
        .then((response) => {
          console.log("Loaded form is: ");
          console.log(response);
          newForm.value = response;
          revNumber.value = newForm.value.revNumber;
          formContent.value = newForm.value.content.FormContent;
          formStatus.value = newForm.value.status;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    var formValidator = () => {
      var check = formContent.value;
      for (let i in check) {
        var section = check[i];
        for (let item in section) {
          var sect = section[item];
          if (role.includes("ROLE_USER")) {
            if (sect == "vendor") {
              for (let question of sect) {
                if (question.input == "" || question.input == []) {
                  toast.error("Form Not Filled Completely!", {
                    position: toast.POSITION.TOP_CENTER,
                    pauseOnHover: false,
                    autoClose: 2000,
                  });
                  return false;
                }
              }
            }
          } else {
            for (let question of sect) {
              if (question.input == "" || question.input == []) {
                toast.error("Form Not Filled Completely!", {
                  position: toast.POSITION.TOP_CENTER,
                  pauseOnHover: false,
                  autoClose: 2000,
                });
                return false;
              }
            }
          }
        }
      }
      return true;
    };

    loadForm(formID);
    return {
      createFormError,
      formDeadline,
      currFormId,
      newForm,
      displayRole,
      saveForm,
      currentUser,
      submitForm,
      loadForm,
      formContent,
      formStatus,
      role,
      revNumber,
      vendorName,
      formDueDate,
      testEmail,
    };
  },
};
</script>
