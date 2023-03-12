import { def } from "@vue/shared";
import axios from "axios";
import authHeader from "../authHeader";

const API_URL = "http://localhost:8080/api/user/";

class UserService {
  getUsers() {
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

  getVendorUsers(vendorId) {
    const response = axios
      .get(API_URL + vendorId, { headers: authHeader() })
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

  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
