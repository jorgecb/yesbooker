//headers-----

let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
const initialState = user.tkn;
let myHeaders = new Headers();
myHeaders.append("tkn", initialState);
myHeaders.append("Accept", "application/x-www-form-urlencoded");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



//headers peticiones---

export const HaderAccessGET: RequestInit = {
  method: "GET",
  headers: myHeaders,
};

export const HaderAccessDELETE: RequestInit = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow",
};
