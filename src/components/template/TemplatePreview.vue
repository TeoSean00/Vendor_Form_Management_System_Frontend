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

    watch(props.newForm, () => {
      console.log("previewData updated!", props.newForm);
    });

    return {};
  },
};
</script>
