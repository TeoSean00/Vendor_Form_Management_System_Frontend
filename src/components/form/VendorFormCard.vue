<template>
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <h2 class="card-title">{{ formName }}</h2>
          <div class="card-text mt-4">
            <!-- Date created : <br />{{ Date(dateCreated).toString() }}<br /> -->
            <p v-if="formStatus=='vendor_response'">Deadline : {{ deadline }}</p>
            <p>Form description: <br />
            {{ formDesc }}</p>
            <!-- {{ vendorFormId }} -->
            </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-12 pr-0">
              <button class="btn btn-link btn-block" @click="enterForm">
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>    
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    props: ["vendorFormId", "formInfo", "dateCreated", "deadline", "formStatus"],
    setup(props, context) {
      var formStatus = ref("");
      formStatus.value = props.formStatus;
      var formName = ref("");
      formName.value = props.formInfo.formName;
      var formDesc = ref("");
      formDesc.value = props.formInfo.formDesc;

      function enterForm() {
        context.emit("enterForm", props.vendorFormId);
      }
  
      return { props, context, enterForm, formName, formDesc };
    },
  };
  </script>
  