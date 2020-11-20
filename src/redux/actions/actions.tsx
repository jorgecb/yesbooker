import { empty } from 'uuidv4';
import BaseUrl from '../../config';
const logout = async () => {
  let user = JSON.parse(localStorage.getItem('UserCredenciales') || '{}');
  const initialState = user.tkn
  let myHeaders = new Headers();
  myHeaders.append("tkn", initialState);
  var requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
  };
  const rawResponse = await fetch('http://reservasapi.yes-admin.com/index.php/Auth/logout', requestOptions)
  const content = await rawResponse.json()
  if (content.status === 200) {
    localStorage.removeItem("UserCredenciales");
    window.location.href = "./login";
  } else {
    window.location.href = "./admin";
  }
};
export default {
  logout,
};
