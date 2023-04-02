import axios from "axios";
import authHeader from "./authHeader";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(user) {
    const response = axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
    return response;
  }

  signup(user) {
    const response = axios
      .post(API_URL + "signup", {
        username: user.value.username,
        password: user.value.password,
        email: user.value.email,
        roles: [user.value.roles],
        vendorId: user.value.vendor[1],
      })
      .then((response) => {
        toast.success("User successfully created!", {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          autoClose:2000,
        });
        return response.data;
      })
      .catch((error) => {
        console.log("failed! response is", error);
        toast.error("User creation failed!", {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          autoClose:2000,
        });
        return error;
      });
    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();