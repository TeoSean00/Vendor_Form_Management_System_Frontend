<template>
  <Navbar/>

  <div class="row justify-content-center bg-light-grey">
    <div class="col-8">
      <div
        class="row m-1 mt-3 p-2 border rounded border-light border-1 bg-white shadow-sm"
      >
        <h1 class="text-main-blue">Form Builder</h1>
        {{ previewObj }}
        {{ formName }}
        {{ desc }}
        <div class="row">
          <span class="text-secondary-blue"
            >Form Name:
            <input
              class="col-6"
              type="text"
              placeholder="Give this form a name!"
              v-model="formName"
            />
          </span>
        </div>
        <!-- <div class="row">
          <span class="text-secondary-blue"
            >Assigned to:
            <select v-model="assignedTo">
              <option>Vendor</option>
              <option>Admin</option>
            </select>
          </span>
        </div> -->
        <div class="row">
          <span class="text-secondary-blue">Description: </span>
          <textarea
            placeholder="Enter Form Description"
            v-model="desc"
            rows="2"
            cols="1"
          ></textarea>
        </div>
      </div>
      {{ newForm }}
      <div class="row p-1 mt-1">
        <div v-for="(section, index) in formSections" :key="index">
          <SectionComponent
            :order="index"
            :sectionInfo="section"
            @updateSection="update"
            @removeSection="removeSection"
          />
        </div>
        <!-- <div v-for="(item, index) in formItems" :key="index">
          <FormComponent
            :itemInfo="item"
            :idx="index"
            @updateQuestion="update"
            @remove="removeQuestion"
          />
        </div> -->
      </div>
    </div>
    <div class="col-8 justify-content-center text-center">
      <button @click="addAdminSection" class="col-4 m-3 btn btn-main-blue">
        Add Admin Section
      </button>
      <button @click="addVendorSection" class="col-4 m-3 btn btn-main-blue">
        Add Vendor Section
      </button>
      <!-- <hr class="border border-dark border-2 mt-2 opacity-75" /> -->

      <div class="col-6 m-1 p-1">
        <TemplateList :list="templates" @addTemplate="addTemplate" />
      </div>
    </div>

    <div class="col-10">
      <div class="row">
        <button @click="exportForm" class="btn btn-turqouise mb-3">
          Export Form
        </button>
        <button
          type="button"
          class="btn btn-secondary-blue mb-3"
          data-bs-toggle="modal"
          data-bs-target="#templatePreview"
          @click="togglePreview"
        >
          Preview Form
        </button>
        <button
          v-if="selectedVendor == null"
          class="btn btn-main-blue mb-3"
          data-bs-toggle="modal"
          data-bs-target="#createFormModal"
        >
          Create Form
        </button>
        <button
          v-if="selectedVendor != null"
          class="btn btn-main-blue mb-3"
          @click="toggleCreateForm"
        >
          Create Form
        </button>
      </div>
      <!-- Tyler button to go Do Form page-->
      <div class="row mt-4">
        <router-link to="/vendorForm">
          <button class="btn btn-turqouise mb-3">Go to Form (TYLER)</button>
        </router-link>
      </div>
    </div>

    <!-- Modal -->
    <TemplatePreview :newForm="newForm" />

    <!-- Modal for selecting vendor to create form for -->
    <div
      class="modal fade"
      id="createFormModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label class="form-label">Select Vendor</label>
            <hr />
            <select
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              v-model="selectedVendor"
            >
              <template v-for="(vendor, index) in vendors" :key="index">
                <option :value="vendor">{{ vendor.name }}</option>
              </template>
            </select>
            <div v-if="selectedVendor" class="alert alert-warning" role="alert">
              You selected {{ selectedVendor.name }}
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
              @click="toggleCreateForm"
            >
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
import { useTemplateStore } from "../stores/templateStore";
import { ref, watch } from "vue";
import FormService from "../services/form/formService";
import VendorService from "../services/vendor/vendorService";
import { useRouter } from "vue-router";

export default {
  components: {
    Navbar,
    FormComponent,
    TemplateList,
    SectionComponent,
    TemplatePreview,
  },
  props: ["vendorId"],
  setup(props) {
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

    console.log("vendorId Received", props.vendorId);

    //temporary template data
    var templates = ref([
      {
        templateInfo: {
          templateName: "New Vendor Assessment Form",
          assignedTo: "Vendor",
          templateDesc: "Assessment for new vendors",
        },
        templateContents: [
          {
            vendor: [
              {
                type: "header",
                order: 0,
                text: "NEW VENDOR ASSESSMENT FORM",
                style: "h1",
              },
              { type: "text", order: 1, text: "Company's Name" },
              { type: "number", order: 2, text: "Company Registration No:" },
              { type: "text", order: 3, text: "Office Address" },
              {
                type: "boolean",
                order: 4,
                text: "GST Registered",
                options: ["Yes", "No"],
              },
              { type: "number", order: 5, text: "Tel" },
              { type: "text", order: 6, text: "Fax" },
              {
                type: "checkbox",
                order: 7,
                text: "Type of business License/Registration",
                options: [
                  "Sole Proprietorship",
                  "Limited Company",
                  "Partnership Agreement",
                  "Others",
                ],
              },
              {
                type: "header",
                order: 0,
                text: "Contact Person",
                style: "h1",
              },
              { type: "text", order: 8, text: "Contact Name" },
              { type: "number", order: 9, text: "Contact Tel" },
              { type: "text", order: 10, text: "Contact Designation" },
              {
                type: "checkbox",
                order: 11,
                text: "Nature of Business",
                options: [
                  "Manufacturing",
                  "Agent/dealer",
                  "Distributor",
                  "Others",
                ],
              },
              {
                type: "text",
                order: 12,
                text: "If you picked Others please specify the nature of your business",
              },
            ],
          },
          {
            admin: [
              {
                type: "header",
                order: 0,
                text: "NEW VENDOR ASSESSMENT FORM",
                style: "h1",
              },
              {
                type: "boolean",
                order: 2,
                text: "ISO 9001 Certification",
                options: ["Yes", "No"],
              },
              { type: "text", order: 3, text: "Certification Body" },
              {
                type: "boolean",
                order: 4,
                text: "Accreditation of Laboratory",
                options: ["Yes", "No"],
              },
              { type: "text", order: 5, text: "Accreditation Body" },
              {
                type: "boolean",
                order: 6,
                text: "Product Certification",
                options: ["Yes", "No"],
              },
              {
                type: "text",
                order: 7,
                text: "Product Markings (e.g. PSB, UL, TUV)",
              },
              {
                type: "boolean",
                order: 8,
                text: "Site Evaluation Results",
                options: ["Yes", "No"],
              },
              {
                type: "checkbox",
                order: 9,
                text: "Site Evaluation Results",
                options: ["Satisfactory", "Unsatisfactory"],
              },
              {
                type: "boolean",
                order: 10,
                text: "Results of Samples/Product Evaluation",
                options: ["Yes", "No"],
              },
              {
                type: "checkbox",
                order: 11,
                text: "Results of Samples/Product Evaluation",
                options: ["Satisfactory", "Unsatisfactory"],
              },
              {
                type: "boolean",
                order: 12,
                text: "Results of First Deal",
                options: ["Yes", "No"],
              },
              {
                type: "checkbox",
                order: 13,
                text: "Results of First Deal",
                options: ["Satisfactory", "Unsatisfactory"],
              },
              {
                type: "boolean",
                order: 14,
                text: "Track Record Review/ Customer Reference",
                options: ["Yes", "No"],
              },
              {
                type: "checkbox",
                order: 15,
                text: "Track Record Review/ Customer Reference",
                options: ["Satisfactory", "Unsatisfactory"],
              },
              {
                type: "boolean",
                order: 16,
                text: "Other Evaluation",
                options: ["Yes", "No"],
              },
              {
                type: "text",
                order: 17,
                text: "Specify: Product Markings (e.g. PSB, UL, TUV)",
              },
            ],
          },
        ],
      },
    ]);

    // var templates = useTemplateStore();
    console.log("current templates are", templates);

    var formName = ref("");
    var desc = ref("");
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
      // console.log("parent checking the state of the form", formItems);
    }

    function removeSection(toRemove) {
      formSections.value.splice(toRemove, 1);
    }
    function exportForm() {
      //Packages the form content into a JSON string
      //This is where we write the ajax code
      const outputObj = {
        templateInfo: {
          templateName: formName.value,
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

    var previewObj = ref({
      templateInfo: {
        formName: formName,
        formDesc: desc,
      },
      templateContents: formSections,
    });

    var togglePreview = () => {
      console.log("Preview Toggled");
      // console.log("updated previewObj", previewObj.value);
    };

    var newForm = ref({});

    //create form from template
    var createForm = () => {
      console.log("Checking templateData in createform", previewObj.value);
      var info = previewObj.value.templateInfo;
      newForm.value["FormInfo"] = info;
      for (let label in info) {
        console.log("label is", label, info[label]);
      }
      var content = previewObj.value.templateContents;
      console.log("sections are", content);

      newForm.value["FormContent"] = [];
      for (let key in content) {
        console.log("KEY IS ", key);
        var section = content[key];
        console.log("section is", section);

        var sectionKey = Object.keys(section)[0];
        console.log(sectionKey);

        // create vendor/admin section
        var sectionItems = [];

        for (let row of section[sectionKey]) {
          let type = row.type;
          // console.log("row is", row, "type is", type);
          if (type == "text") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: "",
              type: type,
            });
          } else if (type == "radio" || type == "checkbox") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: [],
              options: row.options,
              type: type,
            });
          } else if (type == "header") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              style: row.style,
              type: type,
            });
          } else if (type == "number") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: "",
              type: type,
            });
          } else if (type == "boolean") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: [],
              options: row.options,
              type: type,
            });
          } else if (type == "date") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: "",
              options: row.options,
              type: type,
            });
          } else if (type == "likertGroup") {
            sectionItems.push({
              order: row.order,
              label: row.text,
              input: [],
              options: row.options,
              type: type,
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

    watch(previewObj.value, () => {
      console.log("previewData updated!", previewObj.value);
      newForm.value = {};
      createForm();
      console.log("createform called!,newform is ", newForm.value);
    });

    var vendors = ref(null);
    var selectedVendor = ref(null);
    const currId = ref(props.vendorId);
    var vendorInfo = ref(null);
    var getVendorInfo = async () => {
      vendorInfo.value = await VendorService.getVendor(currId.value);
      selectedVendor.value = vendorInfo.value;
    };
    getVendorInfo();


    var getVendors = async () => {
      vendors.value = await VendorService.getVendors();
    };

    getVendors();

    var toggleCreateForm = async () => {
      console.log("selected Vendor is", selectedVendor);
      var newFormObject = {
        vendorName: selectedVendor.value.name,
        creationDate: Date.now(),
        content: newForm.value,
        vendorId: selectedVendor.value.id,
      };
      await FormService.addForm(newFormObject)
        .then((response) => {
          alert("Form created!");
          if (vendorInfo !=null){
            toggleVendorPage(vendorInfo.value.name, vendorInfo.value.id);
          }
          console.log(response);
        })
        .catch((error) => {
          alert(error);
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
      selectedVendor,
      vendors,
      currId,
      vendorInfo,
      toggleCreateForm,
      previewObj,
      content,
      formName,
      desc,
      templates,
      formSections,
      update,
      exportForm,
      addTemplate,
      addAdminSection,
      addVendorSection,
      removeSection,
      togglePreview,
      toggleVendorPage,
      newForm,
    };
  },
};
</script>
