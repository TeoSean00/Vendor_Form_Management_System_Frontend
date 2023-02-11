<template>
  <div>
    I will take in the template json and transform it into a form!
    <div>{{ formData }}</div>
    <div v-for="(sectionData, index) in formData" :key="index">
      <FormSection :sectionData="sectionData" />
    </div>
  </div>
</template>

<script>
import FormSection from "../components/FormSection.vue";
export default {
  components: { FormSection },
  setup() {
    const formData = {
      1: { type: "text", order: 1, text: "Company’s Name" },
      2: { type: "text", order: 2, text: "Company’s Registration No" },
      3: { type: "text", order: 3, text: "GST Registered (Yes/No)" }, //this should be radio
      4: { type: "text", order: 4, text: "Office Address" },
      5: { type: "text", order: 5, text: "Tel" },
      6: { type: "text", order: 6, text: "Fax" },
      7: { type: "text", order: 7, text: "Type of Business" }, // this should be radio button select
      8: { type: "text", order: 8, text: "Contact Person" }, // requires name,tel,designation of person
      9: { type: "text", order: 9, text: "Nature of Business" }, // this should be multiselect
      10: { type: "text", order: 10, text: "Product/Services" },
    };

    return { formData };
  },
};
</script>
