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
        console.log("post request successful!");
        return response.data;
      })
      .catch((error) => {
        console.log("post request unsuccessful", error);
        return error;
      });
    return response;
  }
  getVendors() {
    const response = axios
      .get(API_URL + "all", { headers: authHeader() })
      .then((response) => {
        console.log("get request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("get request unsuccessful", error);
        return error;
      });
    return response;
  }
}

export default new VendorService();
