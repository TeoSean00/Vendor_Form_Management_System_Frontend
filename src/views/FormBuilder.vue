<template>
  <Navbar />
  <div class="row mx-5">
    <div class="col-10">
      <div
        class="row m-1 mt-3 p-2 border rounded border-light border-1 bg-white shadow-sm"
      >
        <h1 class="text-main-blue">Form Builder</h1>
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
          <textarea v-model="desc" rows="2" cols="1"></textarea>
        </div>
      </div>
      <div class="row m-1">
        <div v-for="(section, index) in formSections" :key="index">
          <SectionComponent :sectionInfo="section" @updateSection="update" />
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

    <div class="col-lg-2">
      <div class="row m-1 p-1 border border-dark border-3">
        <!-- <button @click="addHeaderText" class="my-1 btn btn-main-blue">
          Add Header
        </button>
        <button @click="addTextInput" class="my-1 btn btn-main-blue">
          Add Text Input
        </button>
        <button @click="addNumberInput" class="my-1 btn btn-main-blue">
          Add Number Input
        </button>
        <button @click="addBooleanInput" class="my-1 btn btn-main-blue">
          Add BooleanInput
        </button>
        <button @click="addDateInput" class="my-1 btn btn-main-blue">
          Add DateInput
        </button>
        <button @click="addCheckboxInput" class="my-1 btn btn-main-blue">
          Add Checkbox Input
        </button>
        <button @click="addRadioInput" class="my-1 btn btn-main-blue">
          Add Radio Input
        </button>
        <button @click="addLikertGroupInput" class="my-1 btn btn-main-blue">
          Add Likert Group
        </button>
        <hr class="border border-dark border-2 mt-2 opacity-75" /> -->
        <button @click="addAdminSection" class="my-1 btn btn-main-blue">
          Add Admin Section
        </button>
        <button @click="addVendorSection" class="my-1 btn btn-main-blue">
          Add Vendor Section
        </button>
        <hr class="border border-dark border-2 mt-2 opacity-75" />

        <TemplateList :list="templates" @addTemplate="addTemplate" />
      </div>

      <div class="row">
        <button @click="exportForm" class="btn btn-turqouise mb-3">
          Export Form
        </button>
        <button
          type="button"
          class="btn btn-turqouise"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click="togglePreview"
        >
          Preview Form
        </button>
      </div>
    </div>

    <!-- Modal -->
    <TemplatePreview :previewData="previewObj" />
  </div>
</template>

<script>
import TemplateList from "../components/template/TemplateList.vue";
import Navbar from "../components/navbar/Navbar.vue";
import UserService from "../services/userService";
import FormComponent from "../components/form/FormComponent.vue";
import SectionComponent from "../components/form/SectionComponent.vue";
import TemplatePreview from "../components/template/TemplatePreview.vue";
import { useTemplateStore } from "../stores/templateStore";
import { ref } from "vue";

export default {
  components: {
    Navbar,
    FormComponent,
    TemplateList,
    SectionComponent,
    TemplatePreview,
  },
  setup() {
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

    //temporary template data
    var templates = [
      {
        templateInfo: {
          templateName: "New Vendor Assessment Form",
          assignedTo: "Vendor",
          templateDesc: "Assessment for new vendors",
        },
        templateContents: [
          {
            Vendor: [
              {
                type: "header",
                order: 0,
                text: "NEW VENDOR ASSESSMENT FORM",
                style: "h1",
              },
              { type: "text", order: 1, text: "Company's Name" },
              { type: "number", order: 2, text: "Company Registration No:" },
              { type: "text", order: 3, text: "Office Address" },
              { type: "boolean", order: 4, text: "GST Registered" },
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
            Admin: [
              {
                type: "header",
                order: 0,
                text: "NEW VENDOR ASSESSMENT FORM",
                style: "h1",
              },
              { type: "boolean", order: 2, text: "ISO 9001 Certification" },
              { type: "text", order: 3, text: "Certification Body" },
              {
                type: "boolean",
                order: 4,
                text: "Accreditation of Laboratory",
              },
              { type: "text", order: 5, text: "Accreditation Body" },
              { type: "boolean", order: 6, text: "Product Certification" },
              {
                type: "text",
                order: 7,
                text: "Product Markings (e.g. PSB, UL, TUV)",
              },
              { type: "boolean", order: 8, text: "Site Evaluation Results" },
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
              },
              {
                type: "checkbox",
                order: 11,
                text: "Results of Samples/Product Evaluation",
                options: ["Satisfactory", "Unsatisfactory"],
              },
              { type: "boolean", order: 12, text: "Results of First Deal" },
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
    ];

    // var templates = useTemplateStore();
    console.log("current templates are", templates);

    var formName = ref("");
    var assignedTo = ref("Vendor");
    var desc = ref("Enter form description here.");
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
      console.log("parent checking the state of the form", formItems);
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

    var previewObj = ref({
      templateInfo: {
        templateName: formName.value,
        assignedTo: assignedTo.value,
        templateDesc: desc.value,
      },
      templateContents: formSections.value,
    });

    var togglePreview = () => {
      console.log("Preview Toggled");
      console.log("updated previewObj", previewObj.value);
    };

    return {
      previewObj,
      content,
      formName,
      assignedTo,
      desc,
      templates,
      formSections,
      update,
      exportForm,
      addTemplate,
      addAdminSection,
      addVendorSection,
      togglePreview,
    };
  },
};
</script>
