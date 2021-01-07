let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
const initialState = user.tkn;
let myHeaders = new Headers();
myHeaders.append("tkn", initialState);

export const HaderAccessGET: RequestInit = {
  method: "GET",
  headers: myHeaders,
};
