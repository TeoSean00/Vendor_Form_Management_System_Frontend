<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <div class="row d-flex">
          <div class="col-8">
            <h2 class="card-title">{{ formName }}</h2>
          </div>
          <div class="col-4">
            <button class="btn bg-light" data-bs-toggle="modal"
                data-bs-target="#remindModal">
              <font-awesome-icon
                icon="envelope"
                class=""
              />
            </button>
          </div>
        </div>

        <div class="card-text mt-4">
          <!-- Date created : <br />{{ Date(dateCreated).toString() }}<br /> -->
          <p v-if="formStatus == 'vendor_response'">
            Deadline : {{ deadline }}
          </p>
          <p>
            Form description: <br />
            {{ formDesc }}
          </p>

          <!-- {{ vendorFormId }} -->
        </div>
      </div>
      <div class="card-footer">
        <div class="row" v-if="formStatus == 'deleted'">
          <button class="btn btn-link btn-block" @click="enterForm">
            Enter
          </button>
        </div>
        <!--EMAIL FUNCTION-->
        <!-- <div class="row justify-content-center border-0">
          <div class="col-6" style="border-right: 0 ; padding-left: 0;">
            <testEmail
            class="btn btn-link border-0"
            data-bs-toggle="modal"
            data-bs-target="#remindModal"
            ></testEmail>
          </div>
        </div> -->
        <div
          class="d-flex btn-group"
          v-else-if="formStatus == 'form_completed'"
        >
          <button class="btn btn-link btn-block" @click="generatePdf">
            <span>PDF </span>
            <font-awesome-icon
              icon="file-pdf"
              class=""
              data-bs-toggle="modal"
              data-bs-target="#remindModal"
            />
          </button>
          <button class="btn btn-link btn-block" @click="generateWord">
            <span>Word </span>
            <font-awesome-icon
              icon="file-word"
              class=""
              data-bs-toggle="modal"
              data-bs-target="#remindModal"
            />
          </button>
        </div>
        <div class="row" v-else>
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
import axios from "axios";
import authHeader from "../../services/authHeader";
import testEmail from "../../components/admin/components/TestEmail.vue";

export default {
  components: { testEmail },
  props: [
    "vendorFormId",
    "formInfo",
    "dateCreated",
    "deadline",
    "formStatus",
    "vendorUsers",
  ],
  emits: ["updateToDelete"],
  setup(props, context) {
    var formStatus = ref("");
    formStatus.value = props.formStatus;
    console.log(formStatus);
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
      var myHeaders = new Headers();
      myHeaders.append("Authorization", authHeader().Authorization);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      await fetch(
        "http://localhost:8080/api/form/generateForm/" + props.vendorFormId,
        requestOptions
      )
        .then((response) => response.blob())
        .then((blob) => {
          const fileURL = URL.createObjectURL(blob);
          // Display PDF using an iframe
          const iframe = document.createElement("iframe");
          iframe.src = fileURL;
          document.body.appendChild(iframe);
          // Download PDF
          const link = document.createElement("a");
          link.href = fileURL;
          link.download = "example.pdf";
          link.click();
          // var fileURL = window.URL.createObjectURL(
          //   new Blob([response.data], { type: "application/pdf" })
          // );
          // var fileLink = document.createElement("a");
          // fileLink.href = fileURL;
          // fileLink.setAttribute("download", "file.pdf");
          // document.body.appendChild(fileLink);
          // fileLink.click();
          // var file = new Blob([response.data], { type: "application/pdf" });
          // var fileURL = URL.createObjectURL(file);
          // window.open(fileURL);
        });
    };

    var generateWord = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", authHeader().Authorization);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      await fetch(
        "http://localhost:8080/api/form/generateWordDocument/" +
          props.vendorFormId,
        requestOptions
      )
        .then((response) => response.blob())
        .then((blob) => {
          const fileURL = URL.createObjectURL(blob);
          // Display PDF using an iframe
          const iframe = document.createElement("iframe");
          iframe.src = fileURL;
          document.body.appendChild(iframe);
          // Download PDF
          const link = document.createElement("a");
          link.href = fileURL;
          link.download = "example.docx";
          link.click();
          // var fileURL = window.URL.createObjectURL(
          //   new Blob([response.data], { type: "application/pdf" })
          // );
          // var fileLink = document.createElement("a");
          // fileLink.href = fileURL;
          // fileLink.setAttribute("download", "file.pdf");
          // document.body.appendChild(fileLink);
          // fileLink.click();
          // var file = new Blob([response.data], { type: "application/pdf" });
          // var fileURL = URL.createObjectURL(file);
          // window.open(fileURL);
        });
    };
    return {
      formStatus,
      props,
      context,
      updateToDelete,
      enterForm,
      formName,
      formDesc,
      generatePdf,
      generateWord,
      testEmail,
    };
  },
};
</script>
