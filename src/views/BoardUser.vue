<template>
  <Navbar />

  <section id="forms" class="forms">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h1 class="text-main-blue">{company name}</h1>
          <h2 class="my-4">All forms</h2>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch" >
            <div class="icon-box">
              <div class="icon"><font-awesome-icon icon="fa-file" /></div>
              <h4><a href="">Form 1</a></h4>
              <p>--------------------------------------------------------</p>
              <h4>Progress: Saved</h4>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" >
            <div class="icon-box">
              <div class="icon"><font-awesome-icon icon="fa-file" /></div>
              <h4><a href="">Form 2</a></h4>
              <p>--------------------------------------------------------</p>
              <h4>Progress: Awaiting evaluation</h4>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
            <div class="icon-box">
              <div class="icon"><font-awesome-icon icon="fa-file" /></div>
              <h4><a href="">Form 3</a></h4>
              <p>--------------------------------------------------------</p>
              <h4>Progress: Saved</h4>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" >
            <div class="icon-box">
              <div class="icon"><font-awesome-icon icon="fa-file" /></div>
              <h4><a href="">Form 4</a></h4>
              <p>--------------------------------------------------------</p>
              <h4>Progress: To be filled</h4>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" >
            <div class="icon-box">
              <div class="icon"><font-awesome-icon icon="fa-file" /></div>
              <h4><a href="">Form 5</a></h4>
              <p>--------------------------------------------------------</p>
              <h4>Progress: Awaiting Approval</h4>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" >
            <div class="icon-box">
              <div class="icon"><font-awesome-icon icon="fa-file" /></div>
              <h4><a href="">Form 6</a></h4>
              <p>--------------------------------------------------------</p>
              <h4>Progress: Approved</h4>
            </div>
          </div>

        </div>

      </div>
    </section>
</template>

<script>
import TemplateList from "../components/template/TemplateList.vue";
import Navbar from "../components/navbar/Navbar.vue";
import UserService from "../services/userService";
import FormComponent from "../components/form/FormComponent.vue";
import SectionComponent from "../components/form/SectionComponent.vue";
import { useTemplateStore } from "../stores/templateStore";
import { ref } from "vue";

export default {
  components: {
    Navbar,
    FormComponent,
    TemplateList,
    SectionComponent,
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
      content,
      formItems,
      formName,
      assignedTo,
      desc,
      templates,
      formSections,
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
      exportForm,
      addTemplate,
      addAdminSection,
      addVendorSection,
    };
  },
};
</script>
