import axios from "axios";
import authHeader from "../authHeader";

console.log(authHeader());

const API_URL = "http://localhost:8080/api/form/";

class FormService {
  addForm(FormObject) {
    const response = axios
      .post(API_URL, FormObject, { headers: authHeader() })
      .then((response) => {
        console.log("addForm post request successful!");
        return response.data;
      })
      .catch((error) => {
        console.log("addForm post request unsuccessful", error);
        return error;
      });
    return response;
  }
  getForms() {
    const response = axios
      .get(API_URL + "all", { headers: authHeader() })
      .then((response) => {
        console.log("getForms get request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("getForms get request unsuccessful", error);
        return error;
      });
    return response;
  }

  getVendorForms(vendorId) {
    const response = axios
      .get(API_URL + "vendor/" + vendorId, { headers: authHeader() })
      .then((response) => {
        console.log("getVendorForms get request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("getVendorForms get request unsuccessful", error);
        return error;
      });
    return response;
  }

  getVendorUpdateForms(vendorID) {
    const response = axios.get(API_URL + "updates/" + vendorID, { headers: authHeader() })
    .then((response) => {
      console.log("getVendorUpdateForms successful", response);
      return response.data;
    })
    .catch((error) => {
      console.log("getVendorUpdateForms unsuccessful", error);
      return error;
    })
    return response;
  };

  getForm(formID) {
    const response = axios
      .get(API_URL + formID, { headers: authHeader() })
      .then((response) => {
        console.log("getForm get request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("getForm get request unsuccessful", error);
        return error;
      });
    return response;
  }

  updateForm(formID, FormObject) {
    const response = axios
      .put(API_URL + formID, FormObject, { headers: authHeader() })
      .then((response) => {
        console.log("updateForm put request successful!", FormObject);
        return response.data;
      })
      .catch((error) => {
        console.log("updateForm put request unsuccessful", error);
        return error;
      });
    return response;
  }

  deleteForm(formID) {
    const response = axios
      .delete(API_URL + formID, { headers: authHeader() })
      .then((response) => {
        console.log("deleteForm delete request successful!", response);
        return response.data;
      })
      .catch((error) => {
        console.log("deleteForm delete request unsuccessful", error);
        return error;
      });
    return response;
  }
}

export default new FormService();
