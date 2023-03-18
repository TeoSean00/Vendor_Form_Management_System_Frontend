import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
// import Register from "../views/Register.vue"
import Dashboard from "../views/DashboardView.vue";
import Home from "../views/Home.vue";
import FormBuilder from "../views/FormBuilder.vue";
import ViewForm from "../views/ViewForm.vue";
import ManageVendorView from "../views/ManageVendorView.vue";
import ManageUserView from "../views/ManageUserView.vue";
import CreateUser from "../views/CreateUser.vue";
import VendorForm from "../views/VendorForm.vue";
import AdminVendor from "../views/AdminVendor.vue";
import authVerify from "../services/authVerify";
import VendorView from "../views/VendorView.vue";

const requireAuth = (to, from, next) => {
  // verify if jwt token is still valid
  authVerify();
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("current user in auth guard: ", user);
  // if (!user && to.name != "Home") next({ name: "Home" });
  if (!user) next({ name: "login" });
  else next();
};

const requireAdmin = (to, from, next) => {
  // verify if jwt token is still valid
  authVerify();
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("current user in auth guard: ", user);
  // if (!user && to.name != "Home") next({ name: "Home" });
  if (!user || user.roles.includes("ROLE_ADMIN", "ROLE_MODERATOR") == false)
    next({ name: "login" });
  else next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(to, from, next) {
        authVerify();
        let user = JSON.parse(localStorage.getItem("user"));
        console.log("current user in auth guard: ", user);
        // if (!user && to.name != "Home") next({ name: "Home" });
        if (!user) {
          next({ name: "login" });
        } else {
          if (user.roles.includes("ROLE_ADMIN", "ROLE_MODERATOR") == false) {
            next({ name: "VendorView" });
          }
          next();
        }
      },
    },
    {
      path: "/vendorView",
      name: "VendorView",
      component: VendorView,
      beforeEnter: requireAuth,
    },
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
      beforeEnter: requireAdmin,
    },
    {
      path: "/users",
      name: "users",
      component: ManageUserView,
      beforeEnter: requireAdmin,
    },
    {
      path: "/createUser",
      name: "createUser",
      component: CreateUser,
      props: (route) => ({ vendorId: route.query.vendorId }),
      beforeEnter: requireAdmin,
    },
    // {
    //   path: "/mod",
    //   name: "mod",
    //   component: () => import("../views/BoardModerator.vue"),
    // },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/BoardUser.vue"),
    },
    {
      path: "/formbuilder",
      name: "formbuilder",
      component: FormBuilder,
      props: (route) => ({ vendorId: route.query.vendorId }),
      beforeEnter: requireAdmin,
    },
    {
      path: "/viewForm",
      name: "viewForm",
      component: ViewForm,
      beforeEnter: requireAdmin,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
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
    // {
    //   path: "/test",
    //   name: "Test",
    //   component: () => import("../views/Test.vue"),
    //   beforeEnter: requireAuth,
    // },
    {
      path: "/vendorForm",
      name: "VendorForm",
      component: () => import("../views/VendorForm.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/admin/:name",
      name: "AdminVendor",
      component: AdminVendor,
      props: (route) => ({ vendorId: route.query.vendorId }),
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
