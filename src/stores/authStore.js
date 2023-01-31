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
        (response) => {
          this.status.loggedIn = true;
          globalThis.user = user;
          console.log("login success!");
        },
        (error) => {
          this.status.loggedIn = false;
          this.user = null;
          console.log("login failed!");
        }
      );
    },
    logout() {
      console.log("logout called");
      return AuthService.logout().then((response) => {
        this.status.loggedIn = false;
        this.user = null;
        s;
      });
    },
    register(user) {
      return AuthService.register(user).then(
        (response) => {
          this.state.status.loggedIn = false;
          console.log("registration success!");
          return Promise.resolve(response.data);
        },
        (error) => {
          this.state.status.loggedIn = false;
          console.log("registration failed!");
          return Promise.reject(error);
        }
      );
    },
  },
});
