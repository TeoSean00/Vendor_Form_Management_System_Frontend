<template>
  <div class="mt-2 p-2 border rounded border-light border-1 bg-dark-purple shadow-sm">
    <div class="row">
      <div class="col-12">
        {{ assignTo }} Section 
          <button class="text-center borderless-button mx-2" @click="removeSection(order)">
            Remove Section <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
      </div>
        <div class="row">
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
    <div class="col-6 offset-3 sticky-bottom d-flex justify-content-center border rounded border-light border-1 bg-light-grey shadow-lg">
      <div class="row " >
        
      </div>
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
import { ref, computed } from "vue";
export default {
  components: { FormComponent },
  props: ["sectionInfo", "order"],
  setup(props, context) {
    var formItems = ref(props.sectionInfo[Object.keys(props.sectionInfo)[0]]);
    // console.log(formItems.value);
    const assignTo = computed(()=>{
      if (Object.keys(props.sectionInfo)[0] == "admin") {
        return "Admin";
      } else {
        return "Vendor";
      }
    })

    function addTextInput() {
      formItems.value.push({
        type: "text",
        order: formItems.value.length,
        text: "",
        required : false,
      });
    }
    function addCheckboxInput() {
      formItems.value.push({
        type: "checkbox",
        order: formItems.value.length,
        text: "",
        options: [],
        required : false,
      });
    }
    function addRadioInput() {
      formItems.value.push({
        type: "radio",
        order: formItems.value.length,
        text: "",
        options: [],
        required : false,
      });
    }
    function addHeaderText() {
      formItems.value.push({
        type: "header",
        order: formItems.value.length,
        text: "",
        style: "h1",
        required : false,
      });
    }
    function addBooleanInput() {
      formItems.value.push({
        type: "boolean",
        order: formItems.value.length,
        text: "",
        options: ["Yes", "No"],
        required : false,
      });
    }
    function addDateInput() {
      formItems.value.push({
        type: "date",
        order: formItems.value.length,
        text: "",
        required : false,
      });
    }
    function addNumberInput() {
      formItems.value.push({
        type: "number",
        order: formItems.value.length,
        text: "",
        required : false,
      });
    }
    function addLikertGroupInput() {
      formItems.value.push({
        type: "likertGroup",
        order: formItems.value.length,
        text: "",
        options: [],
        required : false,
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

    function removeSection(toRemove){
      context.emit("removeSection",toRemove);
    }

    return {
      formItems,
      assignTo,
      addCheckboxInput,
      addRadioInput,
      addHeaderText,
      addBooleanInput,
      addDateInput,
      addNumberInput,
      addLikertGroupInput,
      addTextInput,
      removeQuestion,
      removeSection,
      update,
    };
  },
};
</script>
