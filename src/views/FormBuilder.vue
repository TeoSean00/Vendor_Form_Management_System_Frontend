<template>
  <Navbar />
  <div class="row mx-5">
    <div class="col-10">
      <div v-for="(item, index) in formItems" :key="index">
        <FormComponent
          :itemInfo="item"
          :idx="index"
          @updateQuestion="update"
          @remove="removeQuestion"
        />
      </div>
    </div>

    <div class="col-2">
      <div class="row">
        <button @click="addText" class="btn btn-main-blue">Add Text</button>
        <button @click="addTextInput" class="btn btn-main-blue">
          Add Text Input
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
    var formItems = ref([]);
    var formOutput = ref({});

    // addText();
    // addTextInput();

    function addText() {
      //   formItems.value.push("Sample Headers");
    }
    function addTextInput() {
      formItems.value.push({
        type: "text",
        order: formItems.value.length,
        text: "",
      });
    }

    function update(data) {
      console.log("parent checking the state of the form", formItems);
    }

    // Text, Text,  Radio
    // Text, Radio
    function removeQuestion(questionKey) {
      //Remove from formItems first
      console.log("Removing " + questionKey);
      formItems.value.splice(questionKey, 1);
    }

    function exportForm() {
      console.log("-----------------------------------------");
      console.log("Form has been exported, details below:");
      console.log(formOutput.value);
      console.log("-----------------------------------------");
    }

    return {
      content,
      formItems,
      addText,
      addTextInput,
      update,
      removeQuestion,
      exportForm,
    };
  },
};
</script>
