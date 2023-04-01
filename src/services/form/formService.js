import axios from "axios";
import authHeader from "../authHeader";

const API_URL = "http://localhost:8080/api/form/";

class FormService {
  addForm(FormObject) {
    const response = axios
      .post(API_URL, FormObject, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
  getForms() {
    const response = axios
      .get(API_URL + "all", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }

  getVendorForms(vendorId) {
    const response = axios
      .get(API_URL + "vendor/" + vendorId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }

  getVendorUpdateForms(vendorID) {
    const response = axios.get(API_URL + "updates/" + vendorID, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    })
    return response;
  };

  getForm(formID) {
    const response = axios
      .get(API_URL + formID, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }

  updateForm(formID, FormObject) {
    const response = axios
      .put(API_URL + formID, FormObject, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }

  deleteForm(formID) {
    const response = axios
      .delete(API_URL + formID, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
}

export default new FormService();