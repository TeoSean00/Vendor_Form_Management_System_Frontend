<template>
  <div>
    Information here<br />Error here: {{ error }}<br />Result here: {{ result }}

    <div>
      Testing Vendor creation here
      <form>
        <label for="">Vendor Name</label>
        <input v-model="vendorName" type="text" class="form-control" />
        <button class="btn btn-primary" @click.prevent="addVendor">
          Create Vendor
        </button>
      </form>
      Vendor name is {{ vendorName }} Vendor result is {{ addVendorResult }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../../services/authHeader";
import { ref } from "vue";
export default {
  setup() {
    const API_URL = "http://localhost:8080/api/vendor/";

    var result = ref(null);
    var error = ref("");
    var vendorName = ref("");

    var testApi = async () => {
      await axios
        .get(API_URL + "all", { headers: authHeader() })
        .then((response) => {
          result.value = response.data;
        })
        .catch((error) => {
          console.log(error.message);
          error.value = error.message;
        });
    };
    testApi();

    var addVendorResult = ref(null);

    var addVendor = async () => {
      var data = { name: vendorName.value };
      const response = axios
        .post(API_URL, data, { headers: authHeader() })
        .then((response) => {
          addVendorResult.value = response.data;
          return response.data;
        })
        .catch((error) => {
          console.log("post request unsuccessful", error);
          return error;
        });
      return response;
    };

    return { testApi, result, error, vendorName, addVendor, addVendorResult };
  },
};
</script>
