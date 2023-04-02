import { useAuthStore } from "../stores/authStore";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function authVerify() {
  var auth = useAuthStore();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    const jwt = parseJwt(user.accessToken);
    if (jwt.exp * 1000 < Date.now()) {
      auth.logout();
    } else {
    }
  }
}
