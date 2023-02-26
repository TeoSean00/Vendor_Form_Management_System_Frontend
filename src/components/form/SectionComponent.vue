<template>
  <div class="mt-2 p-2 border rounded border-light border-1 bg-white shadow-sm">
    <div class="row">
      <div class="col-10">
        <!-- {{ sectionInfo }} -->
        <div class="row m-1">
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
      <div class="col-1 text-center">
        <div class="row m-1 p-1">
          <button @click="addHeaderText" class="borderless-button">
            <font-awesome-icon icon="fa-solid fa-circle-h" class="fa-2xl" />
          </button>
          <button @click="addTextInput" class="my-1 btn btn-main-blue">
            <font-awesome-icon icon="fa-solid fa-circle-t" />
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
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from "../form/FormComponent.vue";
import { ref } from "vue";
export default {
  components: { FormComponent },
  props: ["sectionInfo"],
  setup(props, context) {
    var formItems = ref(props.sectionInfo[Object.keys(props.sectionInfo)[0]]);
    // console.log(formItems.value);
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

    function update() {
      //Uncomment this out to check
      context.emit("updateSection");
    }

    function removeQuestion(questionKey) {
      //Remove from formItems first
      formItems.value.splice(questionKey, 1);
    }

    return {
      formItems,
      addCheckboxInput,
      addRadioInput,
      addHeaderText,
      addBooleanInput,
      addDateInput,
      addNumberInput,
      addLikertGroupInput,
      addTextInput,
      removeQuestion,
      update,
    };
  },
};
</script>
