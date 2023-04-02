<template>
  <Navbar />
  <section id="forms" class="forms">
    <div class="container">

      <div class="section-title">
        <h1 class="text-main-blue">{company name}</h1>
        <h2 class="my-4">All forms</h2>
      </div>

      <div class="row">
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div class="icon-box">
            <div class="icon"><font-awesome-icon icon="fa-file" /></div>
            <h4><a href="">Form 1</a></h4>
            <p>--------------------------------------------------------</p>
            <h4>Progress: Saved</h4>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
          <div class="icon-box">
            <div class="icon"><font-awesome-icon icon="fa-file" /></div>
            <h4><a href="">Form 2</a></h4>
            <p>--------------------------------------------------------</p>
            <h4>Progress: Awaiting evaluation</h4>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
          <div class="icon-box">
            <div class="icon"><font-awesome-icon icon="fa-file" /></div>
            <h4><a href="">Form 3</a></h4>
            <p>--------------------------------------------------------</p>
            <h4>Progress: Saved</h4>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
          <div class="icon-box">
            <div class="icon"><font-awesome-icon icon="fa-file" /></div>
            <h4><a href="">Form 4</a></h4>
            <p>--------------------------------------------------------</p>
            <h4>Progress: To be filled</h4>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
          <div class="icon-box">
            <div class="icon"><font-awesome-icon icon="fa-file" /></div>
            <h4><a href="">Form 5</a></h4>
            <p>--------------------------------------------------------</p>
            <h4>Progress: Awaiting Approval</h4>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
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
import UserService from "../services/user/userService";
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
      },
      (error) => {
        content.value =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

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
      for (let i = 0; i < template.templateContents.length; i++) {
        var section = template.templateContents[i];
        formSections.value.push(section);
      }
    };

    function update() {
      //Uncomment this out to check
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

      const outputJson = JSON.stringify(outputObj);
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
