
const logout = () => {
  localStorage.removeItem("UserCredenciales");
  window.location.href="./login";

};


export default {
  logout,
};
