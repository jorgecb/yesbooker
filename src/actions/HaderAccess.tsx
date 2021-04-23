//headers-----

const user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
const token = user.tkn;
const myHeaders = new Headers();
myHeaders.append("tkn", token);
myHeaders.append("Accept", "application/x-www-form-urlencoded");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


console.log(token);
/* let prueba == null ? "" : decodeURIComponent(atob(token[1]).replace(/\+/g, " "));
 */



//console.log(atob(token)); 

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
