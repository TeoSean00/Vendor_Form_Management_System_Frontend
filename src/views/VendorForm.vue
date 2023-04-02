<template>
  <Navbar />
  <br />
  <br />

  <div class="modal-dialog modal-xl">
    <div class="modal-content">
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

          <!-- Rejection ARea -->
          <div
            v-if="formStatus == 'vendor_response' && role.includes('ROLE_USER') && newForm.rejectionDetails.vendor != null"
            class=" mt-2 alert alert-danger">

            <h5>Reason for previous rejection by Admin on {{ newForm.latestRejectionDate.slice(0, 10) }}:</h5>
            {{ newForm.rejectionDetails.vendor }}
            <br>
            <br>
            <h5>New Deadline :</h5>
            {{ newForm.deadline.slice(0, 10) }}
          </div>

          <div
            v-if="formStatus == 'admin_response' && role.includes('ROLE_ADMIN') && newForm.rejectionDetails.admin != null"
            class=" mt-2 alert alert-danger">

            <h5>Reason for previous rejection by Approver on {{ newForm.latestRejectionDate.slice(0, 10) }}:</h5>
            {{ newForm.rejectionDetails.admin }}
            <br>
            <br>
            <h5>New Deadline :</h5>
            {{ newForm.deadline.slice(0, 10) }}

          </div>
          <hr class="border border-dark border-2 mt-2 opacity-75" />
        </div>


        <form onsubmit="return false;">
          <template v-for="(section, index) in formContent" :key="index">
            <template v-for="(sectionData, i) in section" :key="i">
              <!-- Display all as disabled if status is deleted -->
              <template v-if="formStatus === 'deleted'">
                <div class="rounded-2 p-4 mt-3" style="border: 1px lightgray solid; box-shadow: 2px 2px 2px 2px #888888;">
                  <h2>
                    {{ i.charAt(0).toUpperCase() + i.slice(1) }} Section
                  </h2>
                </div>
                <template v-for="sect in sectionData" :key="sect">
                  <!-- {{ sect }} -->
                  <FormSection :sectionData="sect" :disabled="true" />
                </template>
              </template>
              <template v-else>
                <!-- Moderator can view all but edit nothing -->

                <template v-if="role.includes('ROLE_MODERATOR')">
                  <div class="rounded-2 p-4 mt-3 bg-dark-purple text-center"
                    style="border: 1px lightgray solid; box-shadow: 2px 2px 2px 2px #888888;">
                    <h2>
                      {{ i.charAt(0).toUpperCase() + i.slice(1) }} Section
                    </h2>
                  </div>

                  <template v-for="sect in sectionData" :key="sect">
                    <!-- {{ sect }} -->
                    <FormSection :sectionData="sect" :disabled="true" />
                  </template>
                </template>
                <template v-else>
                  <!-- To allow admin to view admin part and fill in -->
                  <template v-if="i == 'admin' && role.includes('ROLE_ADMIN')">
                    <div class="rounded-2 p-4 mt-3 bg-dark-purple text-center"
                      style="border: 1px lightgray solid; box-shadow: 2px 2px 2px 2px #888888;">
                      <h2>
                        {{ i.charAt(0).toUpperCase() + i.slice(1) }} Section 
                      </h2> 
                    </div>
                    <template v-for="sect in sectionData" :key="sect">
                      <FormSection :sectionData="sect" :disabled="false" />
                    </template>
                  </template>
                  <!-- To allow admin to view vendor part but not fill in -->
                  <template v-if="i == 'vendor' && role.includes('ROLE_ADMIN')">
                    <div class="rounded-2 p-4 mt-3 bg-dark-purple text-center"
                      style="border: 1px lightgray solid; box-shadow: 2px 2px 2px 2px #888888;">
                      <h2>
                        {{ i.charAt(0).toUpperCase() + i.slice(1) }} Section
                      </h2>
                    </div>
                    <template v-for="sect in sectionData" :key="sect">
                      <FormSection :sectionData="sect" :disabled="true" />
                    </template>
                  </template>
                  <!-- To allow vendor to view vendor part only -->
                  <template v-if="
                    i == 'vendor' &&
                    role.includes('ROLE_USER') &&
                    formStatus == 'vendor_response'
                  ">
                    <div class="rounded-2 p-4 mt-3 bg-dark-purple text-center"
                      style="border: 1px lightgray solid; box-shadow: 2px 2px 2px 2px #888888;">
                      <h2>
                        {{ i.charAt(0).toUpperCase() + i.slice(1) }} Section
                      </h2>
                    </div>
                    <template v-for="sect in sectionData" :key="sect">
                      <FormSection :sectionData="sect" :disabled="false" />
                    </template>
                  </template>
                  <template v-if="
                    i == 'vendor' &&
                    role.includes('ROLE_USER') &&
                    formStatus !== 'vendor_response'
                  ">
                    <div class="rounded-2 p-4 mt-3 bg-dark-purple text-center"
                      style="border: 1px lightgray solid; box-shadow: 2px 2px 2px 2px #888888;">
                      <h2>
                        {{ i.charAt(0).toUpperCase() + i.slice(1) }} Section
                      </h2>
                    </div>
                    <template v-for="sect in sectionData" :key="sect">
                      <FormSection :sectionData="sect" :disabled="true" />
                    </template>
                  </template>
                </template>
              </template>
            </template>
          </template>

          <template v-if="formStatus !== 'deleted'">
            <div class="row justify-content-center mt-3">
                <div class="col-4 text-center" v-if="
                  formStatus == 'admin_response' && role.includes('ROLE_ADMIN')
                ">
                  <!-- Admin response to vendor response -->
                  <button class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#setDeadline">
                    Reject Form
                  </button>
                </div>
              <div class="col-4 text-center" v-if="
                (formStatus == 'admin_response' &&
                  role.includes('ROLE_ADMIN') &&
                  !role.includes('ROLE_MODERATOR')) ||
                (formStatus == 'vendor_response' &&
                  !role.includes('ROLE_ADMIN'))
              ">
                <button class="btn btn-main-blue mx-1" @click="saveForm()" type="submit">
                  Save Form
                </button>
              </div>

              <div class="col-4 text-center" v-if="
                formStatus == 'approver_response' &&
                role.includes('ROLE_MODERATOR')
              ">
                <!-- Approver response to admin response -->
                <button class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#setDeadline">
                  Reject Form
                </button>

              </div>

              <div class="col-4 text-center" v-if="
                formStatus == 'approver_response' &&
                role.includes('ROLE_MODERATOR')
              ">
                <!-- Approver response to complete form -->
                <button class="btn btn-success mx-1" @click="submitForm('form_completed', 'approve')">
                  Approve Form
                </button>

              </div>


              <div class="col-4 text-center" v-if="
                formStatus == 'admin_response' && role.includes('ROLE_ADMIN')
              ">
                <!-- Admin response to approver response -->
                <button class="btn btn-success mx-1" @click="submitForm('approver_response', 'approve')">
                  Submit for approval
                </button>
              </div>

              <div class="col-4 text-center" v-if="
                formStatus == 'vendor_response' && role.includes('ROLE_USER')
              ">
                <!-- Vendor response to admin response    -->
                <button class="btn btn-success mx-1" @click="submitForm('admin_response', 'approve')">
                  Submit to admin
                </button>
              </div>

            </div>
          </template>
        </form>

      </div>
    </div>
  </div>

  <div class="modal fade" id="setDeadline" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Set New Deadline
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label for="vendorNotes" class="form-label">Feedback on form reject</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model.lazy="formFeedback"
            required></textarea>
          <div v-if="feedbackError" class="alert alert-warning" role="alert">
            {{ feedbackError }}
          </div>
          <template v-if="formStatus == 'admin_response'">
            <label class="form-label mb-0 mt-3">Select new deadline here</label>
            <hr />
            <input type="date" id="deadline" name="form-deadline" class="mb-3" v-model.lazy="formDeadline" />
            <div v-if="formDeadline" class="alert alert-warning" role="alert">
              You selected {{ formDeadline }}
            </div>
            <div v-if="createFormError" class="alert alert-danger" role="alert">
              {{ createFormError }}
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <template v-if="formStatus == 'admin_response'">
            <button type="button" class="btn btn-primary" :data-bs-dismiss="
              (formDeadline != null) &
                (Date.parse(formDeadline) > Date.now()) &
                (formFeedback != '')
                ? 'modal'
                : ''
            " @click="submitForm('vendor_response', 'reject')">
              Reject form
            </button>
          </template>
          <template v-else>
            <button type="button" class="btn btn-primary" :data-bs-dismiss="formFeedback != '' ? 'modal' : ''"
              @click="submitForm('admin_response', 'reject')">
              Reject form
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
body {
  background-color: F7F7F7;
}
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

    var vendorName = ref("");
    var formDueDate = ref("");
    var formID = ref(currFormId.value);

    var getDate = () => {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // Current user test
    var currentUser = ref("vendor");
    var newForm = ref([]);
    var formContent = ref([]);
    var formStatus = ref([]);
    var revNumber = ref(null);
    var formDeadline = ref(null);
    var createFormError = ref(null);
    var formFeedback = ref("");
    var feedbackError = ref(null);
    var submitForm = async (status, action) => {
      var message = "";
      if (action == "reject") {
        message = "Form Rejected!";
        if (newForm.value.status == "admin_response") {
          if (formFeedback.value == "") {
            feedbackError.value = "Leave a feedback for vendor";
            return;
          }
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
          feedbackError.value = null;
          newForm.value.deadline = formDeadline.value;
          newForm.value.revNumber = newForm.value.revNumber + 1;
          newForm.value.latestRejectionDate = Date.now();
          newForm.value.rejectionDetails.vendor = formFeedback.value;
          newForm.value.latestRejector = "admin";
          newForm.value.rejectionCount = newForm.value.rejectionCount + 1;
        }
        if (newForm.value.status == "approver_response") {
          if (formFeedback.value == "") {
            feedbackError.value = "Leave a feedback for admin";
            return;
          }

          feedbackError.value = null;
          newForm.value.latestRejectionDate = Date.now();
          newForm.value.latestRejector = "approver";
          newForm.value.rejectionDetails.admin = formFeedback.value;
          newForm.value.rejectionCount = newForm.value.rejectionCount + 1;
        }
      } else if (action == "approve") {
        if (!formValidator()) {

          return;
        } else {
          if (newForm.value.status == "admin_response") {
            newForm.value.latestCompletor = "admin";
            newForm.value.latestCompletedDate = Date.now();
          }
          if (newForm.value.status == "vendor_response") {
            newForm.value.latestCompletor = "vendor";
            newForm.value.latestCompletedDate = Date.now();
          }
          if (newForm.value.status == "approver_response") {
            newForm.value.finalApprover = auth.user.username;
            newForm.value.finalApprovedDate = Date.now();
          }
        }
        message = "Form Submitted!";
      }
      newForm.value.status = status;

      await FormService.updateForm(formID.value, newForm.value)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });

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
        router.push({ path: "/vendorView" });
      } else {
        router.push({ path: "/" });
      }
    };

    // get the roles
    var displayRole = ref(null);
    var auth = useAuthStore();
    displayRole.value = auth.user;
    var role = displayRole.value.roles;
    var loadForm = async (formID) => {
      await FormService.getForm(formID.value)
        .then((response) => {
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
            if (item === "vendor") {
              for (let question of sect) {
                if (question.required === true) {
                  if (question.input === "" || question.input === []) {
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
          } else {
            for (let question of sect) {
              if (question.required) {
                if (question.input === "" || question.input === []) {
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
      }
      return true;
    };

    loadForm(formID);
    return {
      formFeedback,
      feedbackError,
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
