import { ref, computed } from "vue";
import { defineStore } from "pinia";
import AuthService from "../services/authService";

console.log("use Auth Store called!");
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
console.log("initialstate is", initialState);
export const useAuthStore = defineStore("auth", {
  state: () => initialState,
  actions: {
    login(user) {
      console.log("login called!");
      console.log("current user is ", user);
      console.log("current state is", this.status);
      return AuthService.login(user).then(
        user => {
          this.status.loggedIn = true;
          this.user = user;
          console.log("login success!");
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
      console.log("logout called");
      AuthService.logout();
    },
    register(user) {
      return AuthService.register(user).then(
        (response) => {
          this.status.loggedIn = false;
          console.log("registration success!");
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
