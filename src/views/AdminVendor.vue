<template>
  <Navbar />
  <header class="header">
    <div class="text-box mt-6" v-if="vendorInfo">
      <h1 class="heading-primary">
        <span class="heading-primary-main">{{ vendorInfo.name }}</span>
        <span class="heading-primary-sub">{{ vendorInfo.country }}</span>
      </h1>
      <a href="#allusers" data-bs-toggle="modal" class="btn btn-white btn-animated mx-2">All Users</a>
      <a href="#" class="btn btn-white btn-animated mx-2" @click="toggleCreateUserPage(vendorInfo.name, vendorInfo.id)">Add user</a>
      <a href="#" class="btn btn-white btn-animated mx-2" @click="toggleFormBuilderPage(vendorInfo.name, vendorInfo.id)">Add Forms</a>
    </div>
  </header>

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

  <section id="forms" class="forms mt-2">
    <div class="container">

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
      <div class="container mt-2">
        <!-- <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3">
          <h4 class="text-white fs-6 fw-light">Waiting for vendor response</h4>
          <div class="row justify-content-center text-white text-center">
            <div class="col-2 ms-2">
              <div class="form-check form-switch" style="text-align: start;">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Auto Remind</label>
              </div>
            </div>
          </div>
        </div> -->
        <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3 justify-content-between d-flex">
          <h4 class="text-white fs-6 fw-light">Waiting for vendor response</h4>
          <div class="text-white text-center">
              <div class="form-check form-switch" style="text-align: start;">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Auto Remind</label>
              </div>  
          </div>
        </div>
        <div
      v-if="vendorAssignedForms.length > 0"
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center pb-3 fs-6 text-dark-grey"
    >

    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
      <template
      v-for="vendorForm in vendorAssignedForms"
      :key="vendorForm.status"
      >
        <FormCard
          class = "mx-2"
          :dateCreated="vendorForm.createDate"
          :deadline="vendorForm.deadline"
          :vendorFormId="vendorForm.id"
          :formInfo="vendorForm.content.FormInfo"
          :formStatus="vendorForm.status"
          :vendorUsers ="vendorUsers"
          @upToDelete="upToDelete"
          @enterForm="enterForm"
        ></FormCard>
      
      </template>
      </div>
    </div>
    <h2
      v-else
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center py-5 fs-6 text-dark-grey"
    >
      No forms currently available.
    </h2>
      <!-- end of vendor assigned form  -->

      <!-- start admin assigned form -->
    <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3">
      <h4 class="text-white fs-6 fw-light">Waiting for admin response</h4>
    </div>

    <div
      v-if="adminAssignedForms.length > 0"
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center pb-3 fs-6 text-dark-grey"
    >
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        <template
          v-for="vendorForm in adminAssignedForms"
          :key="vendorForm.status"
        >
          <FormCard
            class="mx-2"
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
      </div>
    </div>
      <h2
      v-else
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center py-5 fs-6 text-dark-grey"
    >
      No Form available
    </h2>
      <!-- end of admin assigned form  -->

      <!-- start approval assigned form -->
      <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3">
      <h4 class="text-white fs-6 fw-light">Waiting for approver response</h4>
    </div>

    <div
      v-if="approvalAssignedForms.length > 0"
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center pb-3 fs-6 text-dark-grey"
    >
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        <template
          v-for="vendorForm in approvalAssignedForms"
          :key="vendorForm.status"
        >
          <FormCard
            class="mx-2"
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
      </div>
    </div>
      <h2
      v-else
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center py-5 fs-6 text-dark-grey"
    >
      No Form available
    </h2>
      <!-- end of approval assigned form  -->

      <!-- start completed assigned form -->
      <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3">
      <h4 class="text-white fs-6 fw-light">Completed Forms</h4>
    </div>

    <div
      v-if="completedForms.length > 0"
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center pb-3 fs-6 text-dark-grey"
    >
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        <template
          v-for="vendorForm in completedForms"
          :key="vendorForm.status"
        >
          <FormCard
            class="mx-2"
            :dateCreated="vendorForm.createDate"
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
      </div>
    </div>
      <h2
      v-else
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center py-5 fs-6 text-dark-grey"
    >
      No Form available
      </h2>
      <!-- end of completed assigned form  -->
      
      <!-- start of deleted forms -->
      <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3">
      <h4 class="text-white fs-6 fw-light">Deleted Forms</h4>
    </div>

    <div
      v-if="deletedForms.length > 0"
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center pb-3 fs-6 text-dark-grey"
    >
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        <template
          v-for="vendorForm in deletedForms"
          :key="vendorForm.status"
        >
          <FormCard
            class="mx-2"
            :dateCreated="vendorForm.createDate"
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @upToDelete="upToDelete"
            @enterForm="enterForm"
          ></FormCard>
        </template>
      </div>
    </div>
      <h2
      v-else
      class="border border-secondary border-2 bg-light-grey rounded-bottom text-center py-5 fs-6 text-dark-grey"
    >
      No Form available
      </h2>
      <!-- end of deleted forms -->
    </div>
    <div class="col mt-4"></div>







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

      <!-- MODAL for REMINDER -->
      <div
        class="modal fade"
        id="remindModal"
        tabindex="-1"
        aria-labelledby="remindModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="remindModalLabel">Send Email</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <form>
              <div class="form-group mb-2">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" v-model="remindEmail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              </div>

              <div class="form-group mb-2">
                <label for="exampleText">Message</label>
                <input type="textarea" v-model="remindMessage" class="form-control" id="exampleText" placeholder="Message">
              </div>

              </form>
              <div v-if="errors.length">
                <template v-for="error in errors" :key="error"
                  ><div class="alert alert-warning" role="alert">
                    {{ error }}
                  </div>
                  </template
                >
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
              <button type="submit" 
                class="btn btn-primary" 
                :data-bs-dismiss="errors.length != 0 ? 'modal' : ''"
                @click="sendEmail()"
                >
                Submit
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
import emailjs from '@emailjs/browser';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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

    var remindEmail = ref("");
    var remindMessage = ref("");

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
    var deletedForms = ref([]);
    var errors = ref([])
    
    var checkEmail = (inputText) =>{
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if(inputText.match(mailformat)){
        return true;
      }
      else{
        return false;
      }
    }

    var formCheck = () =>{
      console.log("Checking FORMS")
      let flag = true;
      if(remindEmail.value == ""){
        flag = false
        errors.value.push("Email cannot be left empty")
      }
      else if(!checkEmail(remindEmail.value)){
        flag = false
        errors.value.push("Email Invalid")
      }
      if(remindMessage.value == ""){
        flag = false
        errors.value.push("Email message cannot be left empty")
      }

      return flag
    }

    const sendEmail = () => {

      if (formCheck()){
        emailjs.send("service_xquebpj","template_87ifsho",
        {
            to_name: vendorInfo.value.name,
            send_to: remindEmail.value,
            message: remindMessage.value
        },
        "Qubr9KRvmmD-pLaFH")
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });

        remindEmail.value = "";
        remindMessage.value = "";
        errors.value  = [];

        toast.success("Email Sent Successfully!", {
              position: toast.POSITION.TOP_CENTER,
              pauseOnHover: false,
              autoClose:2000,
            });
        }
      }



    var getAllForms = async () => {
      allForms.value = await FormService.getVendorForms(currId.value);
      for (var i = 0; i < allForms.value.length; i++) {
        if (allForms.value[i].status == "vendor_response") {
          vendorAssignedForms.value.push(allForms.value[i]);
        } else if (allForms.value[i].status == "admin_response") {
          adminAssignedForms.value.push(allForms.value[i]);
        } else if (allForms.value[i].status == "approver_response") {
          approvalAssignedForms.value.push(allForms.value[i]);
        } else if (allForms.value[i].status == "form_completed") {
          completedForms.value.push(allForms.value[i]);
        }else if (allForms.value[i].status == "deleted") {
          deletedForms.value.push(allForms.value[i]);
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
      FormService.getForm(toDelete)
        .then((response) => {
          // console.log("FORM TO DELETE: ");
          // console.log(response);
          const newForm = response;
          newForm.status = "deleted";
          FormService.updateForm(toDelete, newForm)
          .then((response) => {
            toast.success("Form Deleted!", {
              position: toast.POSITION.TOP_CENTER,
              pauseOnHover: false,
              autoClose:2000,
            });
            setTimeout(() => {
              location.reload()
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
      deletedForms,
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
      sendEmail,
      remindEmail,
      remindMessage,
      errors,
      formCheck,
      checkEmail
    };
  },
};
</script>
