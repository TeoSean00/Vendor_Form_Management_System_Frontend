<template>
  <Navbar />

  <div class="row justify-content-center bg-light-grey">

    <div class="col-8">
      <div class="row m-1 mt-3 p-2 border rounded border-light border-1 bg-white shadow-sm">
        <h1 class="text-main-blue">
          Form Builder

          <span class="float-end">
            <button type="button" class="mx-2 btn btn-secondary-blue mb-3" data-bs-toggle="modal"
              data-bs-target="#templatePreview" @click="togglePreview">
              <font-awesome-icon icon="fa-solid fa-eye" />
            </button>
            <button @click="exportForm" class="mx-2 btn btn-turqouise mb-3">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" />
              &nbsp; Save Template
            </button>
            <button v-if="selectedVendor != null" data-bs-toggle="modal" data-bs-target="#createFormModal"
              class="mx-2 btn btn-main-blue mb-3">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
              &nbsp; Assign Form
            </button>
          </span>
        </h1>
        <div class="row">
          <span class="col-3 text-secondary-blue">Form Name:
            <input type="text" placeholder="Give this form a name!" v-model="formName" />
          </span>
          <span class="col-3 text-secondary-blue">Form Code:
            <input type="text" placeholder="Enter in form code." v-model="formCode" />
          </span>
        </div>

        <div class="row">
          <span class="text-secondary-blue">Description: </span>
          <textarea placeholder="Enter Form Description" v-model="desc" rows="2" cols="1"></textarea>
        </div>
      </div>
      <div class="row p-1 mt-1">
        <div v-for="(section, index) in formSections" :key="index">
          <SectionComponent :order="index" :sectionInfo="section" @updateSection="update"
            @removeSection="removeSection" />
        </div>
      </div>
    </div>
    <div class="col-8">
      <div
        class="row m-1 mt-3 mb-1 p-2 border rounded border-light border-1 bg-white shadow-sm justify-content-center text-center">
        <div class="col-8">
          <div class="p-1">
            <button class="btn btn-outline-secondary mb-2 col-12 mx-auto" data-bs-toggle="modal"
              data-bs-target="#selectTemplateModal">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
              Select Template
            </button>
          </div>
          <button @click="addVendorSection" class="col-5 me-2 btn btn-main-blue">
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
            Vendor Section
          </button>
          <button type="button" class="btn btn-secondary btn-circle" @click="scrollToTop">
            <font-awesome-icon icon="fa-solid fa-chevron-up" />
          </button>
          <button @click="addAdminSection" class="col-5 ms-2 btn btn-main-dark-purple">
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
            Admin Section
          </button>
        </div>
      </div>
    </div>

    <!-- Template Selection Modal -->
    <div class="modal fade" id="selectTemplateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Select a Template
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
              v-model="selectedTemplateObject">
              <template v-for="(templates, index) in templatesList" :key="index">
                <option :value="templates.details">
                  {{ templates.details.templateInfo.templateName }}
                </option>
              </template>
            </select>
            <div v-if="selectedTemplateObject" class="alert alert-warning" role="alert">
              You selected
              {{ selectedTemplateObject["templateInfo"]["templateName"] }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-main-blue" data-bs-dismiss="modal" @click="addSelectedTemplate">
              Add Template.
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Preview Modal -->
    <TemplatePreview :newForm="newForm" />

    <!-- Modal for selecting vendor to create form for -->
    <div class="modal fade" id="createFormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Form</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label class="form-label">Select Vendor</label>
            <hr />
            <select class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example" v-model="selectedVendor">
              <template v-for="(vendor, index) in vendors" :key="index">
                <option :value="vendor">{{ vendor.name }}</option>
              </template>
            </select>
            <div v-if="selectedVendor" class="alert alert-warning" role="alert">
              You selected {{ selectedVendor.name }}
            </div>
            <div v-if="selectVendorError" class="alert alert-danger" role="alert">
              {{ selectVendorError }}
            </div>
            <label class="form-label">Set Deadline for this form</label>
            <hr />
            <input type="date" id="deadline" name="form-deadline" class="mb-3" v-model.lazy="formDeadline" />
            <div v-if="formDeadline" class="alert alert-warning" role="alert">
              You selected {{ formDeadline }}
            </div>
            <div v-if="createFormError" class="alert alert-danger" role="alert">
              {{ createFormError }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" :data-bs-dismiss="
              (formDeadline != null) &
                (Date.parse(formDeadline) > Date.now()) &
                (selectedVendor != '')
                ? 'modal'
                : ''
            " @click="toggleCreateForm">
              Create form
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TemplateList from "../components/template/TemplateList.vue";
import Navbar from "../components/navbar/NavbarJP.vue";
import UserService from "../services/user/userService";
import FormComponent from "../components/form/FormComponent.vue";
import SectionComponent from "../components/form/SectionComponent.vue";
import TemplatePreview from "../components/template/TemplatePreview.vue";
import TemplateSelect from "../components/template/TemplateSelect.vue";
import { ref, watch, computed } from "vue";
import FormService from "../services/form/formService";
import VendorService from "../services/vendor/vendorService";
import templateService from "../services/template/templateService";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  components: {
    Navbar,
    FormComponent,
    TemplateList,
    SectionComponent,
    TemplatePreview,
    TemplateSelect,
  },
  props: ["vendorId", "selectedTemplate"],
  setup(props) {
    var content = ref("");
    UserService.getUserBoard().then(
      (response) => {
        content.value = response.data;
      },
      (error) => {
        content.value =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

    var templatesList = ref(null);
    var selectedTemplateObject = ref(null);

    var getTemplatesList = async () => {
      templatesList.value = await templateService.getTemplates();
    };
    getTemplatesList();

    //Adding in a vendor form at every time we refresh...
    // TemplateService.addTemplate(vendorAssessmentForm);

    var formName = ref("");
    var formCode = ref("");
    var desc = ref("");
    var formSections = ref([]);

    var checkEmptyFields = () => {
      var anyEmptyFields = false;
      anyEmptyFields = false;
      if (formName.value.length == 0) {
        anyEmptyFields = true;
      }
      if (formCode.value.length == 0) {
        anyEmptyFields = true;
      }
      if (desc.value.length == 0) {
        anyEmptyFields = true;
      }
      if (formSections.value.length == 0) {
        anyEmptyFields = true;
      }

      return anyEmptyFields;
    };

    var addSelectedTemplate = () => {
      addTemplate(selectedTemplateObject);

    };

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

    var addTemplate = (template) => {
      for (let i = 0; i < template.value["templateContents"].length; i++) {
        var section = template.value["templateContents"][i];
        formSections.value.push(section);
      }
    };

    function update() {
      //Uncomment this out to check
    }

    function removeSection(toRemove) {
      formSections.value.splice(toRemove, 1);
    }
    const selectedTemplateId = props.selectedTemplate;
    if (selectedTemplateId) {
      selectedTemplateObject.value = JSON.parse(selectedTemplateId);
      addSelectedTemplate();
    }
    function exportForm() {
      if (checkEmptyFields()) {
        toast.error("Please include Form Name,description and at least one input!", {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          autoClose: 2000,
        });
        return;
      }
      //Packages the form content into a JSON string
      //This is where we write the ajax code
      const outputObj = {
        templateInfo: {
          templateName: formName.value,
          templateDesc: desc.value,
        },
        templateContents: formSections.value,
      };

      templateService.addTemplate(outputObj);

      toast.success("Template Created!", {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push({
          name: "ManageTemplates"
        })
      }, 500)
    }

    var previewObj = ref({
      templateInfo: {
        formName: formName,
        formDesc: desc,
        formCode: formCode,
      },
      templateContents: formSections,
    });

    var togglePreview = () => {

    };

    var newForm = ref({});

    //build form from template
    var createForm = () => {
      var info = previewObj.value.templateInfo;
      newForm.value["FormInfo"] = info;
      for (let label in info) {
      }
      var content = previewObj.value.templateContents;

      newForm.value["FormContent"] = [];
      for (let key in content) {

        var section = content[key];


        var sectionKey = Object.keys(section)[0];

        // create vendor/admin section
        var sectionItems = [];
        for (let row of section[sectionKey]) {
          let type = row.type;

          if (type == "text") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: "",
              type: type,
              required: row.required
            });
          } else if (type == "radio" || type == "checkbox") {
            if (row.shortAnswer == true) {
              sectionItems.push({
                order: row.order,
                label: row.text,
                input: [],
                options: row.options,
                type: type,
                shortAnswer: row.shortAnswer,
                shortAnswerArr: new Array(row.options.length).fill(""),
                required: row.required
              });
            }
            else {
              sectionItems.push({
                order: row.order,
                label: row.text,
                input: [],
                options: row.options,
                type: type,
                shortAnswer: row.shortAnswer,
                required: row.required
              });
            }

          } else if (type == "header") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              style: row.style,
              type: type,
              required: row.required
            });
          } else if (type == "number") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: "",
              type: type,
              required: row.required
            });
          } else if (type == "boolean") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: [],
              options: row.options,
              type: type,
              required: row.required
            });
          } else if (type == "date") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: "",
              options: row.options,
              type: type,
              required: row.required
            });
          } else if (type == "likertGroup") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: [],
              options: row.options,
              type: type,
              required: row.required
            });
          } else if (type == "acknowledgement") {
            sectionItems.push({
              order: row.order,
              type: type,
              required: row.required
            });
          } else if (type == "approval") {
            sectionItems.push({
              order: row.order,
              type: type,
              required: row.required
            });
          }
        }
        var sectionObject = {};
        if (sectionKey == "admin") {
          sectionObject = {
            admin: sectionItems,
          };
        } else {
          sectionObject = {
            vendor: sectionItems,
          };
        }

        newForm.value["FormContent"].push(sectionObject);
      }
    };

    var scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    watch(previewObj.value, () => {

      newForm.value = {};
      createForm();

    });

    var getVendors = async () => {
      vendors.value = await VendorService.getVendors();
    };

    var vendors = ref([]);
    var selectedVendor = ref("");

    const currId = ref(props.vendorId);
    var vendorInfo = ref(null);
    if (props.vendorId) {
      var getVendorInfo = async () => {
        var vendor = await VendorService.getVendor(currId.value);
        vendors.value.push(vendor);
        selectedVendor.value = vendors.value[0];
      };
      getVendorInfo();
    }
    else{
      getVendors();
    }

    var getDate = () => {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    var formDeadline = ref(null);
    var createFormError = ref(null);
    var selectVendorError = ref(null);
    //add form to vendor
    var toggleCreateForm = async () => {
      if (checkEmptyFields()) {
        toast.error("Please include Form Name,description and at least one input!", {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          autoClose: 2000,
        });
        return;
      }
      if (selectedVendor.value == "") {
        selectVendorError.value = "Please select a Vendor";
        return;
      }
      if (formDeadline.value == null) {
        createFormError.value = "Please select a date";
        return;
      }
      let deadlineDate = Date.parse(formDeadline.value);
      let todayDate = Date.now();

      if (deadlineDate < todayDate) {
        createFormError.value = "Your date cannot be earlier than " + getDate();
        return;
      }
      createFormError.value = null;


      var newFormObject = {
        vendorName: selectedVendor.value.name,
        creationDate: Date.now(),
        deadline: formDeadline.value,
        content: newForm.value,
        vendorId: selectedVendor.value.id,
      };
      await FormService.addForm(newFormObject)
        .then((response) => {
          toast.success("Form Created!", {
            position: toast.POSITION.TOP_CENTER,
            pauseOnHover: false,
            autoClose: 2000,
          });
          router.push("/");
        })
        .catch((error) => {
          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
            pauseOnHover: false,
            autoClose: 2000,
          });
        });
    };

    const router = useRouter();
    const toggleVendorPage = (vendorName, vendorId) => {
      router.push({
        name: "AdminVendor",
        params: {
          name: vendorName,
        },
        query: {
          vendorId: vendorId,
        },
      });
    };

    return {
      selectVendorError,
      createFormError,
      formDeadline,
      selectedVendor,
      selectedTemplateObject,
      vendors,
      currId,
      vendorInfo,
      previewObj,
      content,
      formName,
      formCode,
      desc,
      templatesList,
      formSections,
      toggleCreateForm,
      scrollToTop,
      update,
      exportForm,
      addTemplate,
      addSelectedTemplate,
      addAdminSection,
      addVendorSection,
      removeSection,
      togglePreview,
      toggleVendorPage,
      checkEmptyFields,
      newForm,
    };
  },
};
</script>
