import { ref, computed } from "vue";
import { defineStore } from "pinia";
import AuthService from "../services/authService";

// this is to get user data from updated localStorage temporarily disable for frontend to function
const user = JSON.parse(localStorage.getItem("user"));

// const user = {
//   id: "63d85d7193c8ae0f8f0809af",
//   username: "Mr Admin",
//   email: "moderator123@gmail.com",
//   roles: ["ROLE_ADMIN", "ROLE_MODERATOR"],
//   accessToken:
//     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtb2RlcmF0b3IiLCJpYXQiOjE2NzUyNDAzMzksImV4cCI6MTY3NTMyNjczOX0.HmBGt1DjQiOik9nCyCwCVY5uBSLcSDcPPerGzMQwPr2rW8vZGYZ_tOlytXVeZao5lTXmL7FIyX7WRa2AIPlgIA",
//   tokenType: "Bearer",
// };

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore("auth", {
  state: () => initialState,
  actions: {
    login(user) {
      return AuthService.login(user).then(
        (user) => {
          this.status.loggedIn = true;
          this.user = user;
          return Promise.resolve(user);
        },
        (error) => {
          this.status.loggedIn = false;
          this.user = null;
          console.log("login failed!");
          return Promise.reject(error);
        }
      );
    },
    logout() {
      AuthService.logout();
      location.reload()
    },
    register(user) {
      return AuthService.register(user).then(
        (response) => {
          this.status.loggedIn = false;
          return Promise.resolve(response.data);
        },
        (error) => {
          this.status.loggedIn = false;
          console.log("registration failed!");
          return Promise.reject(error);
        }
      );
    },
  },
});
