import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '../services/authService';

console.log("use Auth Store called!");
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {status:{loggedIn :true},user}
  : {status:{loggedIn:false},user:null};

export const useAuthStore = defineStore('auth',{
    state: () => (initialState),
    actions:{
      login(user){
        console.log("login called!")
        return AuthService.login(user).then(
          response=>{
            this.initialState.status.loggedIn = true;
            this.user = user;
            console.log("login success!")
          },
          error=>{
            this.initialState.loggedIn = false;
            this.user = null;
            console.log("login failed!")
          }
        )
      },
      register(user){
        return AuthService.register(user).then(
          response=>{
            this.state.status.loggedIn = false;
            console.log("registration success!")
            return Promise.resolve(response.data);
          },
          error=>{
            this.state.status.loggedIn = false;
            console.log("registration failed!")
            return Promise.reject(error);
          }
        )
      }
    }
  });
  
