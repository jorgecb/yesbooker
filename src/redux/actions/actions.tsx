import BaseUrl from "../../config";
import { HaderAccessGET } from "../../actions/HaderAccess";

const logout = async () => {
  const rawResponse = await fetch(
    BaseUrl.UrlApi + "Auth/logout",
    HaderAccessGET
  );
  const content = await rawResponse.json();
  if ((content.status === 200, 401)) {
    localStorage.removeItem("UserCredenciales");
    window.location.href = "./login";
  } else {
    console.log(content);
  }
};
export default {
  logout,
};
