<template>
  <Navbar />
  Signed in as {{ currentUser }}
  <br />
  {{ newForm }}
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
          <template v-for="(section, index) in newForm" :key="index">
            <template v-for="(sectionData, i) in section" :key="i">
              <template v-for="sect in sectionData" :key="sect">
                {{ sect }}
                <FormSection :sectionData="sect" />
              </template>
              
            </template>
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
    // var templates = ref([
    //   {
    //     status: "", // Assigned, awaiting evaluation, awaiting approval
    //     templateInfo: {
    //       templateName: "New Vendor Assessment Form",
    //       assignedTo: "Vendor",
    //       templateDesc: "Assessment for new vendors",
    //     },
    //     templateContents: [ { "admin": [ { "type": "header", "order": 0, "text": "Admin Form", "style": "h1" }, { "type": "text", "order": 1, "text": "Text Input" }, { "type": "number", "order": 2, "text": "Num Input" }, { "type": "boolean", "order": 3, "text": "Bool Input", "options": [ "Yes", "No" ] }, { "type": "date", "order": 4, "text": "Date Input" }, { "type": "checkbox", "order": 5, "text": "Checkbox input", "options": [ "1", "2", "3" ] }, { "type": "radio", "order": 6, "text": "Radio Input", "options": [ "1", "2" ] }, { "type": "likertGroup", "order": 7, "text": "Likert Input", "options": [ "1", "2" ] } ] },
    //     { "vendor": [ { "type": "header", "order": 0, "text": "Vendor Form", "style": "h1" }, { "type": "text", "order": 1, "text": "Vendor Text" }, { "type": "number", "order": 2, "text": "Vendor Num" }, { "type": "boolean", "order": 3, "text": "Vendor Bool", "options": [ "Yes", "No" ] }, { "type": "date", "order": 4, "text": "Vendor Date" }, { "type": "checkbox", "order": 5, "text": "Vendor checkbox", "options": [ "1", "2", "3" ] }, { "type": "radio", "order": 6, "text": "Vendor Radio", "options": [ "1", "2" ] }, { "type": "likertGroup", "order": 7, "text": "Vendor Likert", "options": [ "1", "2", "3" ] } ] } ],
    //   },
    // ]);

    var newForm = ref([ { "vendor": [ { "order": 0, "label": "NEW VENDOR ASSESSMENT FORM", "style": "h1", "type": "header" }, { "order": 1, "label": "Company's Name", "input": "", "type": "text" }, { "order": 2, "label": "Company Registration No:", "input": "", "type": "number" }, { "order": 3, "label": "Office Address", "input": "", "type": "text" }, { "order": 4, "label": "GST Registered", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 5, "label": "Tel", "input": "", "type": "number" }, { "order": 6, "label": "Fax", "input": "", "type": "text" }, { "order": 7, "label": "Type of business License/Registration", "input": [], "options": [ "Sole Proprietorship", "Limited Company", "Partnership Agreement", "Others" ], "type": "checkbox" }, { "order": 0, "label": "Contact Person", "style": "h1", "type": "header" }, { "order": 8, "label": "Contact Name", "input": "", "type": "text" }, { "order": 9, "label": "Contact Tel", "input": "", "type": "number" }, { "order": 10, "label": "Contact Designation", "input": "", "type": "text" }, { "order": 11, "label": "Nature of Business", "input": [], "options": [ "Manufacturing", "Agent/dealer", "Distributor", "Others" ], "type": "checkbox" }, { "order": 12, "label": "If you picked Others please specify the nature of your business", "input": "", "type": "text" } ] }, { "admin": [ { "order": 0, "label": "NEW VENDOR ASSESSMENT FORM", "style": "h1", "type": "header" }, { "order": 2, "label": "ISO 9001 Certification", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 3, "label": "Certification Body", "input": "", "type": "text" }, { "order": 4, "label": "Accreditation of Laboratory", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 5, "label": "Accreditation Body", "input": "", "type": "text" }, { "order": 6, "label": "Product Certification", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 7, "label": "Product Markings (e.g. PSB, UL, TUV)", "input": "", "type": "text" }, { "order": 8, "label": "Site Evaluation Results", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 9, "label": "Site Evaluation Results", "input": [], "options": [ "Satisfactory", "Unsatisfactory" ], "type": "checkbox" }, { "order": 10, "label": "Results of Samples/Product Evaluation", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 11, "label": "Results of Samples/Product Evaluation", "input": [], "options": [ "Satisfactory", "Unsatisfactory" ], "type": "checkbox" }, { "order": 12, "label": "Results of First Deal", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 13, "label": "Results of First Deal", "input": [], "options": [ "Satisfactory", "Unsatisfactory" ], "type": "checkbox" }, { "order": 14, "label": "Track Record Review/ Customer Reference", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 15, "label": "Track Record Review/ Customer Reference", "input": [], "options": [ "Satisfactory", "Unsatisfactory" ], "type": "checkbox" }, { "order": 16, "label": "Other Evaluation", "input": [], "options": [ "Yes", "No" ], "type": "radio" }, { "order": 17, "label": "Specify: Product Markings (e.g. PSB, UL, TUV)", "input": "", "type": "text" } ] } ]);
    // var content = templates.value[0].templateContents;
    // for (let key in content) {
    //   // console.log("KEY IS ", key);
    //   var section = content[key];
    //   console.log("section is", section);

    //   var sectionKey = currentUser.value;
    //   // console.log(sectionKey);
    //   if (sectionKey in section){
    //     for (let row of section[sectionKey]) {
    //       let type = row.type;
    //       console.log("row is", row, "type is", type);
    //       if (type == "text") {
    //         newForm.value.push({
    //           order: row.order,
    //           label: row.text,
    //           input: "",
    //           type: type,
    //         });
    //       } else if (type == "radio" || type == "checkbox") {
    //         newForm.value.push({
    //           order: row.order,
    //           label: row.text,
    //           input: [],
    //           options: row.options,
    //           type: type,
    //         });
    //       } else if (type == "header") {
    //         newForm.value.push({
    //           order: row.order,
    //           label: row.text,
    //           style: row.style,
    //           type: type,
    //         });
    //       } else if (type == "number") {
    //         newForm.value.push({
    //           order: row.order,
    //           label: row.text,
    //           input: "",
    //           type: type,
    //         });
    //       } else if (type == "boolean") {
    //         newForm.value.push({
    //           order: row.order,
    //           label: row.text,
    //           input: [],
    //           type: "radio",
    //         });
    //       } else if (type == "date") {
    //         newForm.value.push({
    //           order: row.order,
    //           label: row.text,
    //           input: "",
    //           type: type,
    //         });
    //       }else if (type == "likertGroup") {
    //         newForm.value.push({
    //           order: row.order,
    //           label: row.text,
    //           input: [],
    //           options: row.options,
    //           type: type,
    //         });
    //       }
    //     }
    //   }

    // }
    function submitForm() {
      console.log(newForm.value);
      console.log("Form Submitted");
    }


    return {
      newForm,
      currentUser,
      submitForm,
    };
  },
};
</script>