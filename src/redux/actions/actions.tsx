

const logout = () => {
  localStorage.removeItem("usuarios");
  window.location.href="./login";

};


export default {
  logout,
};
