<style scoped>
.progress {
  height: 3rem;
}
</style>

<template>
  <Navbar />
  <div class="container-fluid text-center">
    <div class="progress mt-4 col-8 offset-2 mx-auto shadow" style="height:15px; border-radius: 0.5rem 0.5rem 0px 0px">
      <div id="progress-bar" class="progress-bar fs-5 bg-main-blue" :style="progressBarFill">
      </div>
    </div>
    <div v-if="stage == 0" class="row col-8 offset-2 bg-white shadow rounded-bottom" >
      <div class="row justify-content-center mt-3">
          <div class="col-2 fw-bold text-main-blue">
            1.Set User Details
          </div>
          <div class="col-2 text-dark-grey">
            2.Set User Access
          </div>
          <div class="col-2 text-dark-grey">
            3.Review
          </div>
      </div>
      <div v-if="stage == 0" class="col-8 offset-2 my-3">
        <div class="row ">
          <div class="form-group mb-3 text-start">
            <label for="username" class="form-label">
              Username<span class="text-danger">*</span>
            </label>
            <input v-model="user.username" id="username" type="text" class="form-control border border-secondary"
              name="username" placeholder="Provide a username." />
          </div>
          <div class="">
            <div v-if="toggleUsernameError" class="alert alert-danger mt-2" role="alert">
              Fill in username.
            </div>
          </div>
        </div>
        <div class="row">
          <!-- //Email starts here -->
          <div class="form-group mb-3 text-start">
            <label for="email" class="form-label">
              Email<span class="text-danger">*</span>
            </label>
            <input id="email" v-model="user.email" type="email" class="form-control border border-secondary"
              placeholder="Please enter an email." name="email" />
            <div v-if="toggleEmailError" class="alert alert-danger mt-2" role="alert">
              Fill in valid email.
            </div>
          </div>
        </div>
        <button v-if="stage == 0" class="btn btn-main-blue ms-auto me-2 col-1" @click="toggleNext">
          Next
        </button>

      </div>
    </div>
    <div v-if="stage == 1" class="row col-8 offset-2 bg-white shadow rounded-bottom">
      <div class="row justify-content-center mt-3">
          <div class="col-2 text-dark-grey">
            1.Set User Details
          </div>
          <div class="col-2 fw-bold text-main-blue">
            2.Set User Access
          </div>
          <div class="col-2 text-dark-grey">
            3.Review
          </div>
      </div>
      <div class="row text-start mt-4 ">
        <div class="row mb-3">
          <div class="col-2 offset-3  ">
            <label for="username" class="form-label">Access Type<span class="text-danger">*</span>
            </label>
          </div>
          <div class="col-3">
            <select class="form-select" v-model="user.roles" name="role">
              <option selected value="user">External Vendor</option>
              <option value="admin">Internal Admin</option>
              <option value="mod">Internal Approver</option>
            </select>
          </div>
        </div>
        <!-- Choose which vendor -->
        <div v-if="user.roles === 'user'" class="row mb-3" >
          <div class="col-2 offset-3  ">
            <label for="username" class="form-label">Vendor<span class="text-danger">*</span>
            </label>
          </div>
          <div  class="col-3">
            <select class="form-select" v-model="user.vendor" name="role">
              <option v-for="(vendor,index) in vendors" :key="index" :value="[vendor.name,vendor.id]">{{vendor.name}}</option>
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-6 offset-3 ">
            <label for="username" class="form-label">
              Password<span class="text-danger">*</span>
            </label>
            <div class="input-group">
              <input v-model="user.password" id="password" type="password" class="form-control border border-secondary"
                name="password" placeholder="Provide or generate a password." />
              <button class="btn btn-secondary" @click="generatePassword">
                Generate
              </button>
            </div>
          </div>
        </div>

        <div class="row justify-content-center ">
          <button v-if="stage > 0 && !submitted" class="col-1 btn btn-secondary my-3 mx-3" @click="togglePrevious">
              Back
            </button>
          <button v-if="stage == 1" class="col-1 btn btn-main-blue my-3" @click="toggleNext">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-if="stage == 2" class="row col-8 offset-2 bg-white shadow rounded-bottom ">
      <div class="row justify-content-center mt-3 mb-3">
          <div class="col-2 text-dark-grey">
            1.Set User Details
          </div>
          <div class="col-2 text-dark-grey">
            2.Set User Access
          </div>
          <div class="col-2 fw-bold text-main-blue">
            3.Review
          </div>
      </div>
      <div class="col-6 offset-3">
        <table class="table table-bordered table-striped text-main-blue">
            <thead >
              <tr>
                <th class="col-1" scope="col">Username</th>
                <th class="col-2" scope="col">{{user.username}}</th>
              </tr>
              <tr>
                <th class="col-1" scope="col">Email</th>
                <th class="col-2" scope="col">{{user.email}}</th>
              </tr>
              <tr>
                <th class="col-1" scope="col">Account Type</th>
                <th class="col-2" scope="col">{{user.roles}}</th>
              </tr>
              <tr v-if="user.roles === 'user'">
                <th class="col-1" scope="col">Organization</th>
                <th class="col-2" scope="col">{{user.vendor[0]}}</th>
              </tr>
            </thead>
          </table>
          <div class="mb-3">
              <input checked type="checkbox" class="form-check-input me-2" name="role" value="user" v-model="sendEmailCheck" />
              <label class="form-check-label" for="flexRadioDefault1">
                Send email to user
              </label>
            </div>
            <button v-if="stage > 0 && !submitted" class="col-2 btn btn-secondary my-3 mx-3" @click="togglePrevious">
              Back
            </button>
          <button class="btn btn-main-blue my-3" @click="toggleSubmit">
            Create User
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar/NavbarJP.vue";
import User from "../models/user";
import { ref, computed } from "vue";
import VendorService from "../services/vendor/vendorService";
import AuthService from "../services/authService";
import emailjs from '@emailjs/browser';
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  components: { Navbar, toast },
  props: ["vendorId"],
  setup(props) {
    const currId = ref(props.vendorId);

    var user = ref({
      email: "",
      password: "",
      roles: 'user',
      vendor: [null, null],
    });

    var checkEmail = (inputText) => {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (inputText.match(mailformat)) {
        return true;
      }
      else {
        return false;
      }
    }

    var generatePassword = () => {
      let chars =
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let passwordLength = 12;
      let password = "";
      for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
        user.value.password = password;
      }
    };

    var vendorInfo = ref(null);
    var getVendorInfo = async () => {
      vendorInfo.value = await VendorService.getVendor(currId.value);
      user.value.vendor = [vendorInfo.value.name, vendorInfo.value.id];
    };
    getVendorInfo();

    var stage = ref(0);
    var sendEmailCheck = ref(true);

    var review = ref(false);
    var submitted = ref(false);
    var toggleSubmit = async () => {

      if (review.value == false) {
        review.value = true;
      }

      await AuthService.signup(user)
        .then((response) => {
          submitted.value = true;
        })
        .catch((error) => {
          submitted.value = false;
          return error;
        });

      if (sendEmailCheck) {
        emailjs.send("service_xquebpj", "template_zuqge75",
          {
            to_name: vendorInfo.value.name,
            to_email: user.value.email,
            username: user.value.username,
            password: user.value.password
          },
          "Qubr9KRvmmD-pLaFH")
          .then((result) => {

          }, (error) => {
            console.log('FAILED...', error.text);
          });

      }
      if (submitted && user.value.vendor[0]) {
        toggleVendorPage(user.value.vendor[0], user.value.vendor[1]);
      } else if (submitted) {
        router.push({
          name: "users",
        });
      }
    };

    var vendors = ref([]);

    var getVendors = async () => {
      vendors.value = await VendorService.getVendors();
    };

    getVendors();

    var toggleUsernameError = ref(false);
    var toggleEmailError = ref(false);

    var progressBarFill = computed(() => {
      return "width: " + ((stage.value + 1) * 33) + "% ;z-index: 0; border-radius: 0.5rem  0px 0px"
    })

    var toggleNext = () => {
      if (stage.value == 0) {
        if (user.value.username == "") {
          toggleUsernameError.value = true;
        }
        else {
          toggleUsernameError.value = false;
        }
        if (user.value.email == "") {
          toggleEmailError.value = true;
        }
        if (!checkEmail(user.value.email)) {
          toggleEmailError.value = true;
        }
        if (user.value.email != "" && user.value.username != "" && checkEmail(user.value.email)) {
          toggleEmailError.value = false;
          toggleUsernameError.value = false;
          stage.value += 1;
        }
      } else if (stage.value > 0) {
        stage.value += 1;
      }
    };
    var togglePrevious = () => {
      stage.value -= 1;
    };

    const router = useRouter();
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

    const colorList = [25, 50, 75, 100];
    const statusList = ["Details", "Permissions", "Review"];
    return {
      generatePassword,
      toggleUsernameError,
      toggleEmailError,
      vendors,
      user,
      toggleSubmit,
      colorList,
      statusList,
      stage,
      currId,
      vendorInfo,
      submitted,
      toggleNext,
      togglePrevious,
      toggleVendorPage,
      sendEmailCheck,
      checkEmail,
      progressBarFill
    };
  },
};
</script>
