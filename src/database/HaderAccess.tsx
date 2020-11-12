export function HaderAccess() {
  const user = JSON.parse(localStorage.getItem('usuarios') || '{}');

  if (user && user.token) {
    return user.token;
  } else {
    return {};
  }

}
export const token = JSON.parse(localStorage.getItem('usuarios') || '{}');
/*  export const token = {Headers:'token ' + user};
 */
export function authHeader() {
  let user = JSON.parse(localStorage.getItem('usuarios') || '{}');

  if (user && user.accessToken) {
    // For Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };

    // for Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}

