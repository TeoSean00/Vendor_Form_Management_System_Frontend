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
    </div>
    <div class="col-12 sticky-bottom text-center d-flex justify-content-center border rounded border-light border-1 bg-white shadow-sm">
      <div class="row m-1 p-1 ">
        <button @click="addHeaderText" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add Header">
          <font-awesome-icon icon="fa-solid fa-h" />
        </button>
        <button @click="addTextInput" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add Text Input">
          <font-awesome-icon icon="fa-solid fa-t" />
        </button>
        <button @click="addNumberInput" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add Number Input">
          <font-awesome-icon icon="fa-solid fa-1" />
        </button>
        <button @click="addBooleanInput" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add True False">
          <font-awesome-icon icon="fa-solid fa-t" />
          <font-awesome-icon icon="fa-solid fa-f" />
        </button>
        <button @click="addDateInput" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add Date">
          <font-awesome-icon icon="fa-solid fa-calendar" />
        </button>
        <button @click="addCheckboxInput" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add Checkbox Group">
          <font-awesome-icon icon="fa-solid fa-circle-check" />
        </button>
        <button @click="addRadioInput" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add Radio Group">
          <font-awesome-icon icon="fa-solid fa-radio" />
        </button>
        <button @click="addLikertGroupInput" class="m-2 btn btn-main-blue btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Add Likert Group">
          <font-awesome-icon icon="fa-solid fa-object-group" />
        </button>
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
        options: ["Yes", "No"],
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
