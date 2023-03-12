import axios from "axios";
import authHeader from "./authHeader";

console.log(authHeader());

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
    console.log("user object received is", user.value);
    const response = axios
      .post(API_URL + "signup", {
        username: user.value.username,
        password: user.value.password,
        email: user.value.email,
        roles: [user.value.roles],
        vendorId: user.value.vendor[1],
      })
      .then((response) => {
        console.log("success! response is", response.data);
        return response.message;
      })
      .catch((error) => {
        console.log("failed! response is", error);
        return error.message;
      });
    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
