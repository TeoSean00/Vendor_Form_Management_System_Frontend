<template>
  <NavbarJP />
  <div class="container-fluid">
    <div class="pt-4 mb-3 d-flex justify-content-between">
      <div class="">
        <h5 class="text-secondary-blue">
          Welcome back,
          <span class="text-main-blue fw-bold">{{ currentUser.username }}</span>
          !
        </h5>
      </div>

      <div>
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#createVendor"
        >
          Add Vendor
        </button>
        <!-- <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createVendor"
        >
          Add Vendor
        </button> -->
      </div>
    </div>

    <!-- vendor data here {{ vendorList }} -->

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

    <!-- <p>Filtered names are</p>
    <p>{{ filteredNames }}</p> -->

    <div v-if="!searchName" class="list-group flex">
      <template v-for="vendor in vendorList" :key="vendor">
        <vendorListItem :vendorDetails="vendor"/>
        <!-- <a
          href="#"
          class="justify-content-between list-group-item list-group-item-action text-main-blue p-4 d-flex"
          aria-current="true"
          @click="toggleVendorPage(vendor.name, vendor.id)"
        >

          <span>
            <h3>Name : {{ vendor.name }}</h3>
            <h5>Country : {{ vendor.country }}</h5>
            <span>Description : {{ vendor.details }}</span
            ><br />
            <span>id : {{ vendor.id }}</span>
          </span>
          <div class="float-right">
            <span class="badge bluebg mx-1 mt-2">In Progress</span>
            <span class="badge text-bg-info">Total</span>
          </div>
        </a> -->

      </template>
    </div>
    <div v-else class="list-group flex">
      <template v-for="vendor in filteredNames" :key="vendor">
        <a
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
      </template>
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
            <div class="mb-3">
              <label for="vendorName" class="form-label">Vendor Name</label>
              <input
                type="username"
                class="form-control"
                v-model="newVendorName"
                placeholder="Vendor name here"
                required
              />
            </div>
            <div class="mb-3">
              <label for="vendorName" class="form-label">Vendor Country</label>
              <input
                type="username"
                class="form-control"
                v-model="newVendorCountry"
                placeholder="Vendor country here"
                required
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
                v-model="newVendorDetails"
                required
              ></textarea>
            </div>
            <div v-if="errors.length">
              <template v-for="(error, index) in errors" :key="index"
                ><div class="alert alert-warning" role="alert">
                  You selected {{ error }}
                </div></template
              >
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
              :data-bs-dismiss="errors.length != 0 ? 'modal' : ''"
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
import vendorListItem from "../components/admin/components/vendorListItem.vue";

export default {
  components: { NavbarJP, vendorListItem },
  setup() {
    var searchName = ref("");

    //get vendor data
    var vendorStore = useVendorStore();

    var vendorList = ref([]);

    console.log("vendors value is", vendorStore.vendors);
    console.log("vendorList is an " + typeof vendorList);

    vendorStore.getVendors();

    var searchName = ref("");

    //watching the vendorStore state for changes
    watch(vendorStore.$state, (state) => {
      console.log("CHANGE DETECTED", state);
      vendorList.value = state.vendors;
    });

    console.log(vendorList.value);

    const filteredNames = computed(() => {
      let matchList = [];
      matchList = vendorList.value.filter(function (vendor) {
        console.log("matching with vendor", vendor, searchName.value);
        if (
          vendor.name.toLowerCase().includes(searchName.value.toLowerCase())
        ) {
          console.log("MATCHED", vendor.name, searchName.value);
          return vendor;
        }
      });
      return matchList;
    });

    console.log("vendors value is", vendorStore.vendors);

    var auth = useAuthStore();
    var currentUser = ref(auth.user);

    const router = useRouter();

    var errors = ref([]);
    var newVendorName = ref("");
    var newVendorDetails = ref("");
    var newVendorCountry = ref("");

    var checkForm = () => {
      console.log("check form is called!");
      let check = true;
      if (newVendorName.value == "") {
        errors.value.push("Vendor name cannot be left blank");
        check = false;
      }
      if (newVendorCountry.value == "") {
        errors.value.push("Vendor country cannot be left blank");
        check = false;
      }

      if (newVendorDetails.value == "") {
        errors.value.push("Vendor details cannot be left blank");
        check = false;
      }
      return check;
    };

    const toggleNewVendor = (newVendorName) => {
      // console.log("toggle create new vendor", newVendorName);
      // console.log("SUMITTED INFO");
      // console.log(newVendorCountry.value);
      // console.log(newVendorName.value);
      // console.log(newVendorDetails.value);
      if (checkForm()) {
        var newVendor = {
          name: newVendorName,
          details: newVendorDetails.value,
          country: newVendorCountry.value,
          forms: [],
        };
        vendorStore.addVendor(newVendor);
        newVendorName.value = "";
        newVendorCountry = "";
        newVendorDetails = "";
      }
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
      errors,
      newVendorCountry,
      searchName,
      filteredNames,
      vendorList,
      newVendorName,
      newVendorDetails,
      currentUser,
      toggleNewVendor,
      toggleEditVendor,
      toggleVendorPage,
      searchName,
      filteredNames,
      vendorListItem,
    };
  },
};
</script>
