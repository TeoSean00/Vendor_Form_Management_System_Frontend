<template>
  <Navbar />
  <div class="container">
    <div class="row px-5 pt-3">
      <p class="text-secondary-blue">
        Welcome back,
        <span class="text-main-blue fw-bold">{{ currentUser.username }}</span> !
      </p>
    </div>
    {{ vendors }}
    <div v-for="vendor in vendors.vendors" :key="vendor">
      <div class="text-main-blue workflow d-flex justify-content-between">
        <span class="hover" @click="toggleCollapse(vendor)">
          <span v-if="vendor.vendorName == null">
            Vendor {{ vendor.vendorId }}
          </span>
          <span v-else>
            {{ vendor.vendorName }}
          </span>
        </span>
        <div class="m-3">
          ADD ASSIGN BUTTON (Make it a popup)
          <font-awesome-icon
            icon="pen-to-square"
            class="hover mx-2 mt-1"
            @click="toggleEditVendor(vendor)"
          />
          <button
            class="btn btn-main-blue mx-2 mt-1"
            @click="toggleFormbuilder(vendor, vendor.vendorId)"
          >
            Create Form
            <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>
      <div
        v-for="form in vendor.forms"
        :key="form.formId"
        :class="{ collapse: !vendor.collapse }"
        class="list-group"
      >
        <div
          class="container my-2 form-option rounded-2 d-flex justify-content-between list-group-item list-group-item-action"
        >
          <div>
            <div>Form Id: {{ form.formId }}</div>
            <div>Form Name: {{ form.formName }}</div>
          </div>
          <div>Form Status: {{ form.status }}</div>
        </div>
      </div>
    </div>

    <div class="p-3">
      <button class="btn btn-primary me-2" @click="toggleFormview">
        View Templates
      </button>
      <button
        type="button"
        class="btn btn-primary me-2"
        data-bs-toggle="modal"
        data-bs-target="#vendorPopup"
      >
        Create Vendor
      </button>
    </div>
  </div>

  <!-- Create Vendor Popup -->
  <div
    class="modal fade"
    id="vendorPopup"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Create New Vendor
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Vendor Name</label
              >
              <input
                type="name"
                placeholder="Vendor name here"
                class="form-control"
                id="vendorName"
                required
                v-model="vendorName"
              />
              <div id="formHelp" class="form-text">
                Note that this is the name of the vendor you are looking to
                onboard.
              </div>
            </div>
          </form>
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
            @click="toggleNewVendor"
          >
            Create Vendor
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Navbar from "../components/navbar/Navbar.vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { useVendorStore } from "../stores/vendorStore";

export default {
  components: { Navbar },
  setup() {
    var vendorName = ref("");
    var vendors = useVendorStore();
    // var vendors = ref([
    //   {
    //     vendorId: 1,
    //     vendorName: "Test Workflow Name",
    //     forms: [
    //       {
    //         formId: 1,
    //         formName: "Form 1",
    //         status: "Pending",
    //       },
    //       {
    //         formId: 2,
    //         formName: "Form 2",
    //         status: "Pending",
    //       },
    //     ],
    //   },
    //   {
    //     vendorId: 2,
    //     vendorName: null,
    //     forms: [
    //       {
    //         formId: 1,
    //         formName: "Form 1",
    //         status: "Pending",
    //       },
    //     ],
    //   },
    //   {
    //     vendorId: 3,
    //     vendorName: null,
    //     forms: [
    //       {
    //         formId: 1,
    //         formName: "Form 1",
    //         status: "Pending",
    //       },
    //     ],
    //   },
    //   {
    //     vendorId: 4,
    //     vendorName: null,
    //     forms: [
    //       {
    //         formId: 1,
    //         formName: "Form 1",
    //         status: "Pending",
    //       },
    //       {
    //         formId: 2,
    //         formName: "Form 2",
    //         status: "Pending",
    //       },
    //       {
    //         formId: 3,
    //         formName: "Form 3",
    //         status: "Pending",
    //       },
    //     ],
    //   },
    // ]);

    function toggleCollapse(vendor) {
      vendor.collapse = !vendor.collapse;
      console.log("Toggle Collapse");
    }

    var auth = useAuthStore();
    var currentUser = ref(auth.user);

    const router = useRouter();

    const toggleFormbuilder = (vendorName, vendorId) => {
      console.log("toggled vendorID", vendorId, "and vendorName", vendorName);
      router.push({
        name: "formbuilder",
        params: { name: vendorName },
        query: { vendorId: vendorId },
      });
    };

    const toggleFormview = () => {
      router.push("/viewform");
    };

    const toggleNewVendor = async () => {
      console.log("vendorname is", vendorName.value);
      var newVendor = {
        name: vendorName.value,
      };
      try {
        vendors.addVendor(newVendor);
      } catch (error) {
        console.log("ERROR,", error.message);
      }
      vendorName.value = "";
    };

    const toggleEditVendor = (vendor) => {
      console.log(vendor.vendorId);
      var newName = prompt("Enter new workflow name!");
      vendor.vendorName = newName;
    };

    return {
      vendors,
      vendorName,
      toggleCollapse,
      currentUser,
      toggleFormbuilder,
      toggleFormview,
      toggleNewVendor,
      toggleEditVendor,
    };
  },
};
</script>
