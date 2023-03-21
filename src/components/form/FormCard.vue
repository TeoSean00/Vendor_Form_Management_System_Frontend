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
          <div>
            <button class="btn btn-main-blue" @click="generatePdf">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import authHeader from "../../services/authHeader";

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

    console.log(
      "AUTHHEADER IS ",
      authHeader(),
      "vendorID is",
      props.vendorFormId
    );

    var generatePdf = async () => {
      await axios
        .get(
          "http://localhost:8080/api/form/generateForm/" + props.vendorFormId,
          { headers: authHeader() },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response.data);
          setTimeout(() => {
            console.log("World!");
          }, 2000);

          // var fileURL = window.URL.createObjectURL(
          //   new Blob([response.data], { type: "application/pdf" })
          // );
          // var fileLink = document.createElement("a");

          // fileLink.href = fileURL;
          // fileLink.setAttribute("download", "file.pdf");
          // document.body.appendChild(fileLink);

          // fileLink.click();
          var file = new Blob([response.data], { type: "application/pdf" });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        });
    };

    return {
      props,
      context,
      updateToDelete,
      enterForm,
      formName,
      formDesc,
      generatePdf,
    };
  },
};
</script>
