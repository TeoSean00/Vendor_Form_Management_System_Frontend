<template>
  <NavbarJP />
  <div class="container">
    <div class="row pt-3 mb-3">
      <div class="col-10">
        <h5 class="text-secondary-blue">
          Welcome back,
          <span class="text-main-blue fw-bold">{{ currentUser.username }}</span>
          !
        </h5>
      </div>

      <div class="col-2">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createVendor"
        >
          Add Vendor
        </button>
      </div>
    </div>
    vendor data here {{ vendorList }}
    <form action="">
      <div class="input-group mb-2">
        <span
          class="input-group-text bluebg text-light"
          @click="filter"
          id="basic-addon3"
          >Search</span
        >
        <input
          v-model="searchName"
          type="text"
          class="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
    </form>
    <p>{{ filteredNames }}</p>

    <div v-if="!searchName" class="list-group flex">
      <template v-for="vendor in vendorList" :key="vendor">
        <a
          href="#"
          class="justify-content-between list-group-item list-group-item-action text-main-blue p-4 d-flex"
          aria-current="true"
          @click="toggleVendorPage(vendor.name, vendor.id)"
        >
          <!-- <span v-if="vendor.name == null">
            <h3>Company {{ vendor.vendorId }}</h3>
          </span> -->
          <span>
            <h3>{{ vendor.name }}</h3>
            <p>{{ vendor.id }}</p>
          </span>
          <div class="float-right">
            <span class="badge bluebg mx-1 mt-2">In Progress</span>
            <span class="badge text-bg-info">Total</span>
          </div>
        </a>
      </template>
      <div class="list-group flex">
        <a
          v-for="vendor in vendorList"
          :key="vendor"
          href="#"
          class="justify-content-between list-group-item list-group-item-action text-main-blue p-4 d-flex"
          aria-current="true"
        >
          <span v-if="vendor.name == null">
            <h3>Company {{ vendor.vendorId }}</h3>
          </span>
          <span v-else>
            <h3>{{ vendor.name }}</h3>
          </span>
          <div class="float-right">
            <span class="badge bluebg mx-1 mt-2">In Progress</span>
            <span class="badge text-bg-info">Total</span>
          </div>
        </a>
      </div>
    </div>

    <div
      class="modal fade"
      id="createVendor"
      tabindex="-1"
      aria-labelledby="createVendorLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create Vendor</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <label for="vendorName" class="form-label">Vendor Name</label>
              <input
                type="username"
                class="form-control"
                v-model="newVendorName"
                placeholder="Vendor name here"
              />
            </div>
            <div class="mb-3">
              <label for="vendorNotes" class="form-label"
                >Additional Details</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="newVendorNote"
              ></textarea>
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
              @click="toggleNewVendor(newVendorName)"
            >
              Create Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- {{workflow.forms._rawValue.length}} -->
</template>

<script>
import { ref, watch, computed } from "vue";
import NavbarJP from "../components/navbar/NavbarJP.vue";
import { useAuthStore } from "../stores/authStore";
import { useVendorStore } from "../stores/vendorStore";
import { useRouter } from "vue-router";

export default {
  components: { NavbarJP },
  setup() {
    var searchName = ref("");

    //get vendor data
    var vendorStore = useVendorStore();

    var vendorList = ref([]);
    var filteredNames = ref([]);

    console.log("vendors value is", vendorStore.vendors);
    console.log("vendorList is an " + typeof vendorList);

    vendorStore.getVendors();

    var searchName = ref("");
    var filteredNames = ref([]);

    //watching the vendorStore state for changes
    watch(vendorStore.$state, (state) => {
      console.log("CHANGE DETECTED", state);
      vendorList.value = state.vendors;

      //   filteredNames.value = computed(() =>{
      //   return vendorList.filter(function(vendor){
      //     vendor.name.includes(searchName)
      //   })
      // });

      filteredNames.value = vendorList.value.filter(function (vendor) {
        vendor.name.includes(searchName);
      });
    });

    watch(searchName, (searchName) => {
      console.log("searchName change!", searchName);
      filteredNames.value = vendorList.value.filter(function (vendor) {
        return vendor.name.includes(searchName);
      });
      console.log(filteredNames.value);
    });

    console.log("vendors value is", vendorStore.vendors);

    var auth = useAuthStore();
    var currentUser = ref(auth.user);

    const router = useRouter();

    var newVendorName = ref("");
    var newVendorNote = ref("");

    const toggleNewVendor = (newVendorName) => {
      console.log("toggle create new vendor", newVendorName);
      var newVendor = {
        name: newVendorName,
        forms: [],
      };
      vendorStore.addVendor(newVendor);
    };

    const toggleEditVendor = (vendor) => {
      console.log(vendor.vendorId);
      var newName = prompt("Enter new vendor name!");
      vendor.name = newName;
    };

    const toggleVendorPage = (vendorName, vendorId) => {
      router.push({
        name: "AdminVendor",
        params: {
          name: vendorName,
        },
        query: {
          vendorId: vendorId,
        },
      });
    };

    // const toggleFormbuilder = () => {
    //   router.push("/formbuilder");
    // };

    // const toggleFormview = () => {
    //   router.push("/viewform");
    // };

    console.log(filteredNames);

    return {
      searchName,
      filteredNames,
      vendorList,
      newVendorName,
      newVendorNote,
      currentUser,
      toggleNewVendor,
      toggleEditVendor,
      toggleVendorPage,
      searchName,
      filteredNames,
    };
  },
};
</script>
