<template>
  <Navbar />
  <div class="row mx-5">
    <div class="col-10">
      <div class="row m-1 p-2 border border-dark border-3">
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
        <div class="row">
          <span class="text-secondary-blue"
            >Assigned to:
            <select v-model="assignedTo">
              <option>Vendor</option>
              <option>Admin</option>
            </select>
          </span>
        </div>
        <div class="row">
          <span class="text-secondary-blue">Description: </span>
          <textarea v-model="desc" rows="2" cols="1"></textarea>
        </div>
      </div>
      <div class="row m-1 p-2 border border-dark border-3">
        <div v-for="(item, index) in formItems" :key="index">
          <FormComponent
            :itemInfo="item"
            :idx="index"
            @updateQuestion="update"
            @remove="removeQuestion"
          />
        </div>
      </div>
    </div>

    <div class="col-2">
      <div class="row m-1 p-1 border border-dark border-3">
        <button @click="addHeaderText" class="my-1 btn btn-main-blue">
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
      </div>
      <div class="row">
        <button @click="exportForm" class="btn btn-turqouise">
          Export Form
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import UserService from "../services/userService";
import FormComponent from "../components/FormComponent.vue";
import { ref } from "vue";

export default {
  components: {
    Navbar,
    FormComponent,
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
        options:[]
      });
    }

    function update() {
      //Uncomment this out to check
      // console.log("parent checking the state of the form", formItems);
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
        formInfo: {
          formName: formName.value,
          assignedTo: assignedTo.value,
          formDesc: desc.value,
        },
        contents: formItems.value,
      };
      
      const outputJson = JSON.stringify(outputObj);
      console.log(outputJson);
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
    };
  },
};
</script>
