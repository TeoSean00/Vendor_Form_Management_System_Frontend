<template>
  <div
    id="templatePreview"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <!-- <div class="m-2">
          {{ templateData }}
        </div> -->
        <div class="form-floating m-4">
          <div class="">
            <h4>Form Details</h4>
            <hr class="border border-dark border-2 mt-2 opacity-75" />
            <template v-for="(info, index) in newForm.FormInfo" :key="index">
              <b>{{ index }}</b
              >: {{ info }}<br />
            </template>
          </div>
          <template
            v-for="(sectionData, index) in newForm.FormContent"
            :key="index"
          >
            <FormUserSection :sectionData="sectionData" />
          </template>
          <button class="btn btn-primary" data-bs-dismiss="modal">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormSection from "../form/FormSection.vue";
import FormUserSection from "../form/FormUserSection.vue";
import { ref, watch } from "vue";
export default {
  components: { FormSection, FormUserSection },
  props: ["newForm"],
  setup(props) {
    // const createForm = () => {
    //   console.log("Checking previewdata in createform", props.previewData);
    //   var info = props.previewData.templateInfo;
    //   newForm.value["FormInfo"] = info;
    //   for (let label in info) {
    //     console.log("label is", label, info[label]);
    //   }
    //   var content = props.previewData.templateContents;
    //   console.log("sections are", content);

    //   newForm.value["FormContent"] = [];
    //   for (let key in content) {
    //     console.log("KEY IS ", key);
    //     var section = content[key];
    //     console.log("section is", section);

    //     var sectionKey = Object.keys(section)[0];
    //     console.log(sectionKey);

    //     // create vendor/admin section
    //     var sectionItems = [];

    //     for (let row of section[sectionKey]) {
    //       let type = row.type;
    //       // console.log("row is", row, "type is", type);
    //       if (type == "text") {
    //         sectionItems.push({
    //           order: row.order,
    //           label: row.text,
    //           input: "",
    //           type: type,
    //         });
    //       } else if (type == "radio" || type == "checkbox") {
    //         sectionItems.push({
    //           order: row.order,
    //           label: row.text,
    //           input: [],
    //           options: row.options,
    //           type: type,
    //         });
    //       } else if (type == "header") {
    //         sectionItems.push({
    //           order: row.order,
    //           label: row.text,
    //           style: row.style,
    //           type: type,
    //         });
    //       } else if (type == "number") {
    //         sectionItems.push({
    //           order: row.order,
    //           label: row.text,
    //           input: "",
    //           type: type,
    //         });
    //       } else if (type == "boolean") {
    //         sectionItems.push({
    //           order: row.order,
    //           label: row.text,
    //           input: [],
    //           options: row.options,
    //           type: "radio",
    //         });
    //       } else if (type == "date") {
    //         sectionItems.push({
    //           order: row.order,
    //           label: row.text,
    //           input: "",
    //           options: row.options,
    //           type: type,
    //         });
    //       } else if (type == "likertGroup") {
    //         sectionItems.push({
    //           order: row.order,
    //           label: row.text,
    //           input: [],
    //           options: row.options,
    //           type: type,
    //         });
    //       }
    //     }
    //     var sectionObject = {};
    //     if (sectionKey == "admin") {
    //       sectionObject = {
    //         admin: sectionItems,
    //       };
    //     } else {
    //       sectionObject = {
    //         vendor: sectionItems,
    //       };
    //     }

    //     newForm.value["FormContent"].push(sectionObject);
    //   }
    // };

    watch(props.newForm, () => {
      console.log("previewData updated!", props.newForm);
    });

    // console.log("received previewData", props.newForm);
    // createForm();

    // const handleSubmit = () => {
    //   console.log("submit called");
    //   console.log(newForm.value);
    // };

    return {};
  },
};
</script>
