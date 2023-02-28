<template>
  <Navbar />
  Signed in as {{ currentUser }}
  <br />
  {{ content }}
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <!-- <div class="m-2">
          {{ templateData }}
        </div> -->
      <div class="form-floating m-4">
        <div class="">
          <h4>Form Details</h4>
          <button @click="testUser" class="btn btn-primary">
            Change user
          </button>
          <hr class="border border-dark border-2 mt-2 opacity-75" />
        </div>
        <form onsubmit="return false;">
          <template v-for="(sectionData, index) in newForm" :key="index">
            {{ sectionData }}
          <FormSection :sectionData="sectionData" />
          </template>
          <button class="btn btn-primary" @click="submitForm">
            Submit Form
          </button>
        </form>

      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/navbar/Navbar.vue";
import FormSection from "../components/form/FormSection.vue";
import { ref } from "vue";

export default {
  components: {
    Navbar,
    FormSection,
  },
  props: [],
  setup() {


    // Current user test
    var currentUser = ref("admin");

    var content = ref("");

    //temporary template data
    var templates = ref([
      {
        status: "", // Assigned, awaiting evaluation, awaiting approval
        templateInfo: {
          templateName: "New Vendor Assessment Form",
          assignedTo: "Vendor",
          templateDesc: "Assessment for new vendors",
        },
        templateContents: [ { "admin": [ { "type": "header", "order": 0, "text": "Admin Form", "style": "h1" }, { "type": "text", "order": 1, "text": "Text Input" }, { "type": "number", "order": 2, "text": "Num Input" }, { "type": "boolean", "order": 3, "text": "Bool Input", "options": [ "Yes", "No" ] }, { "type": "date", "order": 4, "text": "Date Input" }, { "type": "checkbox", "order": 5, "text": "Checkbox input", "options": [ "1", "2", "3" ] }, { "type": "radio", "order": 6, "text": "Radio Input", "options": [ "1", "2" ] }, { "type": "likertGroup", "order": 7, "text": "Likert Input", "options": [ "1", "2" ] } ] },
        { "vendor": [ { "type": "header", "order": 0, "text": "Vendor Form", "style": "h1" }, { "type": "text", "order": 1, "text": "Vendor Text" }, { "type": "number", "order": 2, "text": "Vendor Num" }, { "type": "boolean", "order": 3, "text": "Vendor Bool", "options": [ "Yes", "No" ] }, { "type": "date", "order": 4, "text": "Vendor Date" }, { "type": "checkbox", "order": 5, "text": "Vendor checkbox", "options": [ "1", "2", "3" ] }, { "type": "radio", "order": 6, "text": "Vendor Radio", "options": [ "1", "2" ] }, { "type": "likertGroup", "order": 7, "text": "Vendor Likert", "options": [ "1", "2", "3" ] } ] } ],
      },
    ]);

    var newForm = ref([]);
    var content = templates.value[0].templateContents;
    for (let key in content) {
      // console.log("KEY IS ", key);
      var section = content[key];
      console.log("section is", section);

      var sectionKey = currentUser.value;
      // console.log(sectionKey);
      if (sectionKey in section){
        for (let row of section[sectionKey]) {
          let type = row.type;
          console.log("row is", row, "type is", type);
          if (type == "text") {
            newForm.value.push({
              order: row.order,
              label: row.text,
              input: "",
              type: type,
            });
          } else if (type == "radio" || type == "checkbox") {
            newForm.value.push({
              order: row.order,
              label: row.text,
              input: [],
              options: row.options,
              type: type,
            });
          } else if (type == "header") {
            newForm.value.push({
              order: row.order,
              label: row.text,
              style: row.style,
              type: type,
            });
          } else if (type == "number") {
            newForm.value.push({
              order: row.order,
              label: row.text,
              input: "",
              type: type,
            });
          } else if (type == "boolean") {
            newForm.value.push({
              order: row.order,
              label: row.text,
              input: [],
              type: "radio",
            });
          } else if (type == "date") {
            newForm.value.push({
              order: row.order,
              label: row.text,
              input: "",
              type: type,
            });
          }else if (type == "likertGroup") {
            newForm.value.push({
              order: row.order,
              label: row.text,
              input: [],
              options: row.options,
              type: type,
            });
          }
        }
      }

    }
    function submitForm() {
      console.log(newForm.value);
      console.log("Form Submitted");
    }
    function testUser() {
      console.log(currentUser)
      if (currentUser.value == "vendor"){
        currentUser.value = "admin";
      } else{
        currentUser.value = "vendor";
      }
    }

    return {
      content,
      templates,
      newForm,
      currentUser,
      submitForm,
      testUser,
    };
  },
};
</script>