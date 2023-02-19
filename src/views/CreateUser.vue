<template>
  <Navbar />
  <div class="container-flex">
    <form name="form" @submit.prevent="handleRegister">
      <div class="form-group">
        <h5>Set user details</h5>
        <hr class="border border-dark border-1 mt-2 opacity-75" />
        <div class="row mb-3">
          <div class="col">
            <label class="fw-bold" for="username">Username</label>
          </div>
          <div class="col-8">
            <input
              v-model="user.username"
              type="text"
              class="form-control"
              name="username"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="fw-bold" for="email">Email</label>
          </div>
          <div class="col-8">
            <input
              v-model="user.email"
              type="email"
              class="form-control"
              name="email"
            />
          </div>
        </div>
      </div>
      <div class="form-group">
        <h5>Set User Access</h5>
        <hr class="border border-dark border-1 mt-2 opacity-75" />
        <div class="row">
          <div class="col-4">
            <label class="fw-bold" for="access">Access Type</label>
          </div>
          <div class="col-8 d-flex flex-column mb-2">
            <p>
              <input
                v-model="user.roles"
                type="radio"
                class="form-check-input me-2"
                name="role"
                value="user"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                External Vendor
              </label>
            </p>
            <p>
              <input
                v-model="user.roles"
                type="radio"
                class="form-check-input me-2"
                name="role"
                value="admin"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Internal Admin
              </label>
            </p>
            <p>
              <input
                v-model="user.roles"
                type="radio"
                class="form-check-input me-2"
                name="role"
                value="moderator"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Internal Approver
              </label>
            </p>
          </div>
          <div class="row">
            <div class="col">
              <label class="fw-bold" for="password">Password</label>
            </div>
            <div class="col-8">
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                name="password"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <h5>Add user to vendor group (? To b confirmed)</h5>
        <hr class="border border-dark border-1 mt-2 opacity-75" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" @click="toggleReview">
          Review
        </button>
      </div>
    </form>
    <div v-if="review">
      <h5>Review new user details</h5>
      <hr class="border border-dark border-1 mt-2 opacity-75" />
      {{ user }}
      <input
        type="checkbox"
        class="form-check-input me-2"
        name="role"
        value="user"
      />
      <label class="form-check-label" for="flexRadioDefault1">
        Send email to user
      </label>

      <button class="btn btn-primary btn-block" @click="toggleReview">
        Create User
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import User from "../models/user";
import { ref } from "vue";

export default {
  components: { Navbar },
  setup() {
    var user = ref({ username: "", email: "", password: "", roles: [] });
    var review = ref(false);

    var toggleReview = () => {
      if (review.value == false) {
        review.value = true;
      }
    };

    return { user, toggleReview, review };
  },
};
</script>
