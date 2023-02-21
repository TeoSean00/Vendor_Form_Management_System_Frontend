import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue"
import Dashboard from "../views/DashboardView.vue"
import Home from "../views/Home.vue";
import FormBuilder from "../views/FormBuilder.vue";
import ViewForm from "../views/ViewForm.vue";
import ManageVendorView from "../views/ManageVendorView.vue";
import ManageUserView from "../views/ManageUserView.vue";
import CreateUser from "../views/CreateUser.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    // {
    //   path: "/home",
    //   name: "home",
    //   component: Home,
    // },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/vendors",
      name: "vendors",
      component: ManageVendorView,
    },
    {
      path: "/users",
      name: "users",
      component: ManageUserView,
    },
    {
      path: "/createUser",
      name: "createUser",
      component: CreateUser,
    },
    // {
    //   path: "/mod",
    //   name: "mod",
    //   component: () => import("../views/BoardModerator.vue"),
    // },
    // {
    //   path: "/user",
    //   name: "user",
    //   component: () => import("../views/BoardUser.vue"),
    // },
    {
      path: "/formbuilder",
      name: "formbuilder",
      component: FormBuilder,
    },
    {
      path: "/viewForm",
      name: "viewForm",
      component: ViewForm,
    },
    {
      path: "/dashboard",
      name: Dashboard,
      component: () => import("../views/DashboardView.vue"),
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
