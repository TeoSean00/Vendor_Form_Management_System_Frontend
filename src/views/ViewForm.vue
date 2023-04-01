<template>
  <div>
    <div class="m-2">
      {{ templateData }}
    </div>
    <div class="form-floating my-2">
      <div class="bg-secondary-blue">
        <h4>Form Details</h4>
        <template
          v-for="(info, index) in templateData.templateInfo"
          :key="index"
        >
          <p>
            <b>{{ index }}</b
            >: {{ info }}
          </p>
        </template>
      </div>
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
      templateInfo: {
        templateName: "New Vendor Assessment Form",
        assignedTo: "Vendor",
        templateDesc: "Assessment for new vendors",
      },
      templateContents: [
        {
          type: "header",
          order: 0,
          text: "Part A Particulars of applicant (Certificate holder)",
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
          options: ["Manufacturing", "Agent/dealer", "Distributor", "Others"],
        },
        {
          type: "text",
          order: 12,
          text: "If you picked Others please specify the nature of your business",
        },
      ],
    };

    const templates = [templateData];

    //Building the form from the templateData
    var newForm = ref([]);
    const createForm = () => {
      var info = templateData.templateInfo;
      var content = templateData.templateContents;
      for (let key in content) {
        var type = content[key].type;
        if (type == "text") {
          newForm.value.push({
            order: content[key].order,
            label: content[key].text,
            input: "",
            type: type,
          });
        } else if (type == "radio" || type == "checkbox") {
          newForm.value.push({
            order: content[key].order,
            label: content[key].text,
            input: [],
            options: content[key].options,
            type: type,
          });
        } else if (type == "header") {
          newForm.value.push({
            type: type,
            style: content[key].style,
            text: content[key].text,
            order: content[key].order,
          });
        }
      }
    };
    createForm();

    const handleSubmit = () => {

    };

    return { templateData, newForm, handleSubmit };
  },
};
</script>
