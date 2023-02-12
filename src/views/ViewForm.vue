<template>
  <div>
    I will take in the template json and transform it into a form!
    <!-- <div>{{ newForm }}</div> -->
    <div class="form-floating my-2">
      <template v-for="(sectionData, index) in newForm" :key="index">
        <FormSection :sectionData="sectionData" />
      </template>
      <button class="btn btn-primary" @click="handleSubmit">
        Submit Form!
      </button>
    </div>
  </div>
</template>

<script>
import FormSection from "../components/form/FormSection.vue";
import { ref } from "vue";
export default {
  components: { FormSection },
  setup() {
    const templateData = {
      1: { type: "text", order: 1, label: "Company’s Name" },
      2: { type: "text", order: 2, label: "Company’s Registration No" },
      3: {
        type: "radio",
        order: 3,
        label: "GST Registered (Yes/No)",
        options: ["Yes", "No"],
      }, //this should be radio
      4: { type: "text", order: 4, label: "Office Address" },
      5: { type: "text", order: 5, label: "Tel" },
      6: { type: "text", order: 6, label: "Fax" },
      7: {
        type: "checkbox",
        order: 7,
        label: "Type of Business",
        options: ["shady", "not shady", "quite shady"],
      }, // this should be radio button select
      8: { type: "text", order: 8, label: "Contact Person" }, // requires name,tel,designation of person
      9: { type: "text", order: 9, label: "Nature of Business" }, // this should be multiselect
      10: { type: "text", order: 10, label: "Product/Services" },
    };

    //Building the form from the templateData
    var newForm = ref([]);
    const createForm = () => {
      for (let key in templateData) {
        var type = templateData[key].type;
        if (type == "text") {
          newForm.value.push({
            order: templateData[key].order,
            label: templateData[key].label,
            input: "",
            type: type,
          });
        } else if (type == "radio" || type == "checkbox") {
          newForm.value.push({
            order: templateData[key].order,
            label: templateData[key].label,
            input: [],
            options: templateData[key].options,
            type: type,
          });
        }
      }
    };
    createForm();

    const handleSubmit = () => {
      console.log("submit called");
      console.log(newForm.value);
    };

    return { templateData, newForm, handleSubmit };
  },
};
</script>
