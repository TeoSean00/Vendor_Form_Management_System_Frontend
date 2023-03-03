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

            <template
              v-for="(info, index) in previewData.templateInfo"
              :key="index"
            >
              <b>{{ index }}</b
              >: {{ info }}<br />
            </template>
          </div>
          <template v-for="(sectionData, index) in newForm" :key="index">
            <FormSection :sectionData="sectionData" />
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
import { ref, watch } from "vue";
export default {
  components: { FormSection },
  props: ["previewData"],
  setup(props) {
    var newForm = ref([]);

    const createForm = () => {
      console.log("Checking previewdata in createform", props.previewData);
      var content = props.previewData.templateContents;
      console.log("content is ", content);
      for (let key in content) {
        // console.log("KEY IS ", key);
        var section = content[key];
        console.log("section is", section);

        var sectionKey = Object.keys(section)[0];
        // console.log(sectionKey);

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
            options: row.options,
            type: "radio",
          });
        } else if (type == "date") {
          newForm.value.push({
            order: row.order,
            label: row.text,
            input: "",
            options: row.options,
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
    };

    watch(props.previewData, () => {
      console.log("previewData updated!", props.previewData);
      newForm.value = [];
      createForm();
      console.log("createform called!,newform is ", newForm.value);
    });

    console.log("received previewData", props.previewData);
    createForm();

    // const handleSubmit = () => {
    //   console.log("submit called");
    //   console.log(newForm.value);
    // };

    return { newForm };
  },
};
</script>
