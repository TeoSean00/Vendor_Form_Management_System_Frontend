<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title">{{ formName }}</h2>
        <p class="card-text">
          Date created : <br />{{ Date(dateCreated).toString() }}<br />
          Deadline : {{ deadline }}<br />
          Form description: <br />
          {{ formDesc }}
          {{ vendorFormId }}
        </p>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-6 pr-0">
            <button class="btn btn-link btn-block" @click="enterForm">
              Enter
            </button>
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
import { ref } from "vue";

export default {
  props: ["vendorFormId", "formInfo", "dateCreated", "deadline"],
  emits: ["updateToDelete"],
  setup(props, context) {
    var formName = ref("");
    formName.value = props.formInfo.formName;
    var formDesc = ref("");
    formDesc.value = props.formInfo.formDesc;
    function updateToDelete() {
      context.emit("upToDelete", props.vendorFormId);
    }

    function enterForm() {
      context.emit("enterForm", props.vendorFormId);
    }

    return { props, context, updateToDelete, enterForm, formName, formDesc };
  },
};
</script>
