import axios from "axios";
import authHeader from "../authHeader";

console.log(authHeader());

const API_URL = "http://localhost:8080/api/vendor/";

class VendorService {
  addVendor(vendorObject) {
    var data = vendorObject;
    const response = axios
      .post(API_URL, data, { headers: authHeader() })
      .then((response) => {
        console.log("addVendor post request successful!");
        return response.data;
      })
      .catch((error) => {
        console.log("addVendor post request unsuccessful", error);
        return error;
      });
    return response;
  }

  getVendors() {
    const response = axios
      .get(API_URL + "all", { headers: authHeader() })
      .then((response) => {
        console.log("getVendors request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("getVendors request unsuccessful", error);
        return error;
      });
    return response;
  }

  updateVendor(vendorId, vendorObject) {
    const response = axios
      .get(API_URL + vendorId, vendorObject, { headers: authHeader() })
      .then((response) => {
        console.log("updateVendor request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("updateVendor request unsuccessful", error);
        return error;
      });
    return response;
  }

  getVendor(vendorId) {
    const response = axios
      .get(API_URL + vendorId, { headers: authHeader() })
      .then((response) => {
        console.log("getVendor request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("getVendor request unsuccessful", error);
        return error;
      });
    return response;
  }

  getJoinDates() {
    const response = axios
      .get(API_URL + "getJoinDates", { headers: authHeader() })
      .then((response) => {
        console.log("getJoinDates request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("getJoinDates request unsuccessful", error);
        return error;
      });
    return response;
  }

  getVendorRejectionRate() {
    const response = axios
      .get(API_URL + "getAverageRejection", { headers: authHeader() })
      .then((response) => {
        console.log("getVendorRejectionRate successful", response);
        return response.data;
      })
      .catch((error) => {
        console.log("getVendorRejectionRate unsucessful", error);
        return error;
      });
    return response;
  }
}

export default new VendorService();
