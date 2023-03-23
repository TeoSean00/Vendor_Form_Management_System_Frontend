<template>
   <!-- Modal for selecting vendor to create form for -->
    <div
      class="modal fade"
      id="createFormModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label class="form-label">Select Vendor</label>
            <hr />
            <select
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              v-model="selectedVendor"
            >
              <template v-for="(vendor, index) in vendors" :key="index">
                <option :value="vendor">{{ vendor.name }}</option>
              </template>
            </select>
            <div v-if="selectedVendor" class="alert alert-warning" role="alert">
              You selected {{ selectedVendor.name }}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="toggleCreateForm"
            >
              Create form
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    emits: ["addTemplate"],
    props: ["list"],
    setup(props, context) {
      var addTemplate = (selectedTemplate) => {
        console.log("selected template is", selectedTemplate);
        context.emit(addTemplate, selectedTemplate);
      };
      return { addTemplate };
    },
  };
  </script>
  