export function HaderAccess() {
  const user = JSON.parse(localStorage.getItem("usuarios") || "{}");

  if (user && user.token) {
    return user.token;
  } else {
    return {};
  }
}
export const token = JSON.parse(localStorage.getItem("usuarios") || "{}");
export function authHeader() {
  let user = JSON.parse(localStorage.getItem("usuarios") || "{}");

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
