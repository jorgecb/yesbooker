import React from "react";
import admin from ".././layouts/Admin";
import BaseUrl from "../config";
import { types } from "../types/types";
import { PrivateRoute, LoginRoute } from ".././layouts/Rutas";
import { HaderAccessGET } from "./HaderAccess";

export const login = (user: any, pass: any) => {
  console.log(user, pass);

  let myHeaders = new Headers();
  myHeaders.append("X-API-KEY", "709cd00931492fef092b3430b64389016fe7eb4f");
  myHeaders.append("Accept", "application/x-www-form-urlencoded");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  let urlencoded = new URLSearchParams();
  urlencoded.append("email", user);
  const encodedString = Buffer.from(pass).toString("base64");
  console.log(encodedString);
  urlencoded.append("password", encodedString);
  let requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  fetch(BaseUrl.UrlApi + "Auth/login", requestOptions).then((response) => {
    console.log(response.status);
    if (response.status === 200) {
      alogin(login, "loginSuccess");
      console.log(response);
      response.json().then((data) => {
        window.localStorage.setItem("UserCredenciales", JSON.stringify(data));

        window.location.href = "./admin";
      });
    } else {
      return;
      console.log(response.status);
    }
  });
};
export const logout = async () => {
  const rawResponse = await fetch(
    BaseUrl.UrlApi + "Auth/logout",
    HaderAccessGET
  );
  const content = await rawResponse.json();
  if ((content.status === 200, 401)) {
    localStorage.removeItem("UserCredenciales");
    window.location.href = "./login";
    alogout(alogout, "LOGOUT");
  } else {
    console.log(content);
  }
};

 const alogout = (data: {}, displayName: any) => ({
    type: types.LOGOUT,
    payload: {
      data,
      displayName,
    },
  });

 const alogin = (data: {}, displayName: any) => ({
  type: types.login,
  payload: {
    data,
    displayName,
  },
});
