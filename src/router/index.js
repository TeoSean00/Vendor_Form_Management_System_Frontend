import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/DashboardView.vue";
import Home from "../views/Home.vue";
import FormBuilder from "../views/FormBuilder.vue";
import ViewForm from "../views/ViewForm.vue";
import ManageVendorView from "../views/ManageVendorView.vue";
import ManageUserView from "../views/ManageUserView.vue";
import CreateUser from "../views/CreateUser.vue";

const requireAuth = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("current user in auth guard: ", user);
  // if (!user && to.name != "Home") next({ name: "Home" });
  if (!user) next({ name: "login" });
  else next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: requireAuth,
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
      beforeEnter: requireAuth,
    },
    {
      path: "/vendors",
      name: "vendors",
      component: ManageVendorView,
      beforeEnter: requireAuth,
    },
    {
      path: "/users",
      name: "users",
      component: ManageUserView,
      beforeEnter: requireAuth,
    },
    {
      path: "/createUser",
      name: "createUser",
      component: CreateUser,
      beforeEnter: requireAuth,
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
      props: (route) => ({ vendorId: route.query.vendorId }),
      beforeEnter: requireAuth,
    },
    {
      path: "/viewForm",
      name: "viewForm",
      component: ViewForm,
      beforeEnter: requireAuth,
    },
    {
      path: "/dashboard",
      name: Dashboard,
      component: () => import("../views/DashboardView.vue"),
      beforeEnter: requireAuth,
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
