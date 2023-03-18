<template>
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h2 class="card-title">{{ vendorFormId }}</h2>
                <p class="card-text">
                  Form description: <br />
                  {{ formInfo }}
                </p>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-6 pr-0">
                    <button class="btn btn-link btn-block" @click="enterForm">Enter</button>
                  </div>
                  
                  <div class="col-6 pl-0">
                    <button
                      class="btn btn-link btn-block"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmModal"
                      @click="updateToDelete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>



<script>


export default {
  props: ["vendorFormId", "formInfo"],
  emits: ["updateToDelete"],
  setup(props, context) {
    function updateToDelete() {
      context.emit("upToDelete", props.vendorFormId);
    };

    function enterForm() {
      context.emit("enterForm", props.vendorFormId);
    };

    return { props, context, updateToDelete, enterForm };
  },
};
</script>