<template>
  <Navbar />
  <div class="container">
    <div class="progress-stacked m-5">
      <div
        class="progress"
        role="progressbar"
        aria-label="status"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <template v-for="(bar, num) in statusList" :key="num">
          <div
            id="progress-bar"
            class="progress-bar"
            :class="{
              'bg-success': num < stage,
              'bg-warning': num == stage,
              'bg-secondary': num > stage,
            }"
            style="width: 25%"
          >
            {{ statusList[num] }}
          </div>
        </template>
      </div>
    </div>
    <form name="form" @submit.prevent="handleRegister">
      <div v-if="stage == 0" class="form-group">
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
        <button class="btn btn-primary btn-block" @click="toggleNext">
          Set Permissions
        </button>
      </div>
      <div v-if="stage == 1" class="form-group">
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
          <div class="row">
            <h5>Add user to vendor group (? To b confirmed)</h5>
            <hr class="border border-dark border-1 mt-2 opacity-75" />
          </div>
        </div>
        <button class="btn btn-primary btn-block" @click="toggleNext">
          Review
        </button>
      </div>
    </form>
    <div v-if="stage == 2">
      <h5>Review new user details</h5>
      <hr class="border border-dark border-1 mt-2 opacity-75" />
      <div class="row mb-3">
        <div class="col">
          <label class="fw-bold" for="username">Username</label>
        </div>
        <div class="col-8">
          <p class="fw-bold">{{ user.username }}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label class="fw-bold" for="email">Email</label>
        </div>
        <div class="col-8">
          <p class="fw-bold">{{ user.email }}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-4">
          <label class="fw-bold" for="access">Access Type</label>
        </div>
        <div class="col-8">
          <p class="fw-bold">{{ user.roles }}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label class="fw-bold" for="password">Password</label>
        </div>
        <div class="col-8">
          <p class="fw-bold">{{ user.password }}</p>
        </div>
      </div>
      <h5>Additional Options</h5>
      <hr class="border border-dark border-1 mt-2 opacity-75" />
      <div class="mb-3">
        <input
          type="checkbox"
          class="form-check-input me-2"
          name="role"
          value="user"
        />
        <label class="form-check-label" for="flexRadioDefault1">
          Send email to user
        </label>
      </div>

      <button class="btn btn-primary btn-block" @click="toggleReview">
        Create User
      </button>
    </div>
    <button v-if="stage > 0" class="btn btn-secondary" @click="togglePrevious">
      Back
    </button>
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

    var toggleReview = () => {
      if (review.value == false) {
        review.value = true;
      }
    };

    var toggleNext = () => {
      stage.value += 1;
    };
    var togglePrevious = () => {
      stage.value -= 1;
    };

    const colorList = [25, 50, 75, 100];
    const statusList = ["Details", "Permissions", "Review", "Complete"];

    var stage = ref(0);
    return {
      user,
      toggleReview,
      colorList,
      statusList,
      stage,
      toggleNext,
      togglePrevious,
    };
  },
};
</script>
