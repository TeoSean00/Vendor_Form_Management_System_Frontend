<template>
  <div class="container-flex">
    <Navbar />
    <div class="row">
      <div class="col-8 offset-2 fs-5 fw-bold mt-5 mb-2 text-main-blue">
        Template Manager
      </div>
      <div class="col-8 offset-2 text-center">
        <table class="table table-bordered table-striped text-main-blue">
          <thead v-if="templatesList.length != 0">
            <tr>
              <th class="col-1" scope="col">No.</th>
              <th class="col-2" scope="col">Name</th>
              <th class="col-3" scope="col">Description</th>
              <th class="col-1" scope="col">Action</th>
            </tr>
          </thead>
          <thead v-else>
            <tr>
              <th class="col-1 py-5" scope="col">
                You have zero templates currently. <br />
                <button class="btn btn-main-blue mt-3" @click="goToFormBuilder">
                  Create one now!
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(template, index) in templatesList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ template.details.templateInfo.templateName }}</td>
              <td>{{ template.details.templateInfo.templateDesc }}</td>
              <td>
                <button
                  class="btn btn-main-blue btn-sm mx-1"
                  @click="enterForm(template.details)"
                >
                  View
                </button>

                <!-- <button class="btn btn-danger btn-sm mx-1" @click="deleteTemplate(template.id)">Delete</button> -->
                <button
                  type="button"
                  class="btn btn-danger btn-sm mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  @click="setDeletedId(template.id)"
                >
                  Delete
                </button>
                <!-- @click="deleteTemplate(template.id) -->
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Modal -->
        <div
          class="modal fade"
          id="confirmDeleteModal"
          tabindex="-1"
          aria-labelledby="confirmDeleteModalLabel"
          aria-hidden="true"
          ref=""
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="confirmDeleteModalLabel">
                  Are you sure?
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                You cannot recover a deleted template! Are you sure you want to
                proceed?
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
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  @click="deleteTemplate()"
                >
                  Delete Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar/NavbarJP.vue";
import templateService from "../services/template/templateService";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  components: { Navbar },
  setup() {
    var templatesList = ref(null);
    var getTemplatesList = async () => {
      templatesList.value = await templateService.getTemplates();
    };
    getTemplatesList();
    var toDelete = null;
    function setDeletedId(id) {
      toDelete = id;
    }

    function deleteTemplate() {
      templateService.deleteTemplates(toDelete).then(() => {
        templatesList.value = templatesList.value.filter(
          (template) => template.id !== toDelete
        );
      });
    }
    const router = useRouter();
    function enterForm(selectObject) {
      router.push({
        name: "formbuilder",
        query: {
          selectedTemplate: JSON.stringify(selectObject),
        },
      });
    }
    function goToFormBuilder() {
      router.push({
        name: "formbuilder",
      });
    }

    return {
      templatesList,
      deleteTemplate,
      enterForm,
      setDeletedId,
      goToFormBuilder,
    };
  },
};
</script>
