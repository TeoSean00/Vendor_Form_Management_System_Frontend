<template>
  <Navbar />

  <header class="header">
    <div class="text-box mt-6" v-if="vendorInfo">
      <h1 class="heading-primary">
        <span class="heading-primary-main">{{ vendorInfo.name }}</span>
        <span class="heading-primary-sub">{{ vendorInfo.country }}</span>
      </h1>
      <a
        href="#allusers"
        data-bs-toggle="modal"
        class="btn btn-white btn-animated mx-2"
        >All Users</a
      >
    </div>
  </header>

  <div
    class="modal fade"
    id="allusers"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="allusersLabel">List of Users</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="usermodal">
          <table class="table align-middle mb-0 bg-white" id="usertable">
            <thead class="bg-light">
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in vendorUsers" :key="user">
                <td>
                  <p class="fw-normal mb-1">{{ ++index }}</p>
                </td>
                <td>
                  <p class="fw-bold mb-1">{{ user.username }}</p>
                  <p class="text-muted mb-0">{{ user.email }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-2">
    <!-- <div class="section-title d-flex justify-content-between">
      <div v-if="vendorInfo">
        <h1 class="text-main-blue">Vendor: {{ vendorInfo.name }}</h1>
        <h3 class="text-main-blue">Country: {{ vendorInfo.country }}</h3>
        <h3 class="text-main-blue">Details: {{ vendorInfo.details }}</h3>
      </div>
      <div
        class="btn-group mt-auto shadow-0"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-toggle="modal"
          href="#allusers"
        >
          All Users
        </button>

        <div
          class="modal fade"
          id="allusers"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabindex="-1"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="allusersLabel">List of Users</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" id="usermodal">
                <table class="table align-middle mb-0 bg-white" id="usertable">
                  <thead class="bg-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in vendorUsers" :key="user">
                      <td>
                        <p class="fw-normal mb-1">{{ ++index }}</p>
                      </td>
                      <td>
                        <p class="fw-bold mb-1">{{ user.username }}</p>
                        <p class="text-muted mb-0">{{ user.email }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    <!-- </div> -->

    <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3 ">
        <h4 class="text-white fs-6 fw-light ">Waiting for vendor response</h4>
    </div>
    <div
      class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2"
      v-if="vendorAssignedForms.length > 0"
    >
      <template
        v-for="vendorForm in vendorAssignedForms"
        :key="vendorForm.status"
      >
        <VendorFormCard
          :dateCreated="vendorForm.createDate"
          :deadline="vendorForm.deadline"
          :vendorFormId="vendorForm.id"
          :formInfo="vendorForm.content.FormInfo"
          @enterForm="enterForm"
        ></VendorFormCard>
      </template>
    </div>

    <h2 v-else class="border border-secondary border-2 bg-light-grey rounded-bottom text-center py-5 fs-6 text-dark-grey">
      No forms currently available.
    </h2>

    <div class="bluebg card text-white mt-5 py-2 text-center">
      <div class="card-body">
        <h4 class="text-white m-0">Waiting for approval</h4>
      </div>
    </div>

    <div
      class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2"
      v-if="adminAssignedForms.length > 0"
    >
      <template
        v-for="vendorForm in adminAssignedForms"
        :key="vendorForm.status"
      >
        <VendorFormCard
          :dateCreated="vendorForm.createDate"
          :deadline="vendorForm.deadline"
          :vendorFormId="vendorForm.id"
          :formInfo="vendorForm.content.FormInfo"
          @enterForm="enterForm"
        ></VendorFormCard>
      </template>
    </div>
    <h2 v-else class="empty text-center py-5">No Form available</h2>

    <div class="bg-secondary rounded-top mt-5 pt-2 pb-1 px-3 ">
        <h4 class="text-white fs-6 fw-light">Completed</h4>
    </div>
    <div class="border border-secondary border-2 bg-light-grey rounded-bottom text-center pb-3 fs-6 text-dark-grey">
      <div
        class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-2 "
        v-if="completedForms.length > 0"
      >
        <template v-for="vendorForm in completedForms" :key="vendorForm.status">
          <VendorFormCard class="mx-2"
            :dateCreated="vendorForm.createDate"
            :deadline="vendorForm.deadline"
            :vendorFormId="vendorForm.id"
            :formInfo="vendorForm.content.FormInfo"
            @enterForm="enterForm"
          ></VendorFormCard>
        </template>
      </div>
      <h2 v-else class="empty text-center py-5">No Form available</h2>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar/NavbarJP.vue";
import { ref } from "vue";
import VendorService from "../services/vendor/vendorService";
import UserService from "../services/user/userService";
import VendorFormCard from "../components/form/VendorFormCard.vue";
import FormService from "../services/form/formService";

import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

export default {
  components: {
    Navbar,
    VendorFormCard,
  },
  setup() {
    var auth = useAuthStore();
    var currentUser = auth.user;
    var vendorId = ref(null);
    vendorId.value = currentUser.vendorId;

    var vendorInfo = ref(null);
    var getVendorInfo = async () => {
      vendorInfo.value = await VendorService.getVendor(vendorId.value);
      console.log(vendorInfo.value);
    };
    getVendorInfo();

    var vendorUsers = ref([]);
    var getUserInfo = async () => {
      vendorUsers.value = await UserService.getVendorUsers(vendorId.value);
    };
    getUserInfo();

    var allForms = ref([]);
    var vendorAssignedForms = ref([]);
    var adminAssignedForms = ref([]);
    var completedForms = ref([]);

    var getAllForms = async () => {
      allForms.value = await FormService.getVendorForms(vendorId.value);
      console.log("hi" + allForms.value[0].vendorId);
      for (var i = 0; i < allForms.value.length; i++) {
        if (allForms.value[i].status == "vendor_response") {
          vendorAssignedForms.value.push(allForms.value[i]);
        } else if (
          allForms.value[i].status == "admin_response" ||
          allForms.value[i].status == "approver_response"
        ) {
          adminAssignedForms.value.push(allForms.value[i]);
        } else if (allForms.value[i].status == "form_completed") {
          completedForms.value.push(allForms.value[i]);
        }
      }
    };
    getAllForms();

    const router = useRouter();
    function enterForm(vendorFormId) {
      console.log("enter form is " + vendorFormId);
      router.push({
        path: "/vendorForm",
        query: {
          vendorFormId: vendorFormId,
        },
      });
    }

    return {
      currentUser,
      vendorInfo,
      vendorId,
      getVendorInfo,
      vendorUsers,
      getUserInfo,
      allForms,
      vendorAssignedForms,
      adminAssignedForms,
      completedForms,
      getAllForms,
      enterForm,
    };
  },
};
</script>
