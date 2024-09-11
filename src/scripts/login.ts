import "bootstrap/dist/css/bootstrap.min.css";
import { doGraphQLFetch } from "../graphql/fetch";
import {login} from "../graphql/queries";
import LoginMessageResponse from "../interfaces/LoginMessageResponse";

const apiURL = import.meta.env.VITE_API_URL;

const loginButton = document.querySelector(
  "#loginButton"
) as HTMLButtonElement;

// login handling
loginButton.addEventListener("click", async () => {
  const loginForm = document.querySelector("#userContent") as HTMLFormElement;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // getting values from the form
    const usernameForm = loginForm.querySelector("#username") as HTMLInputElement;
    const passwordForm = loginForm.querySelector("#password") as HTMLInputElement;
    const usernameInput = usernameForm.value;
    const passwordInput = passwordForm.value;

    // logging the user in
    const loginData = (await doGraphQLFetch(apiURL, login, {
      username: usernameInput,
      password: passwordInput,
    })) as LoginMessageResponse;

    if (!loginData.login) {
      // informs the user that their credentials were not correct
      const loginInfo = document.querySelector("#loginInfo") as HTMLElement;
      if (loginInfo) {
        loginInfo.textContent = 'Väärä tunnus tai salasana';
      }
    } else {
      // saves the login data into local storage
      localStorage.setItem("token", loginData.login.token!);
      localStorage.setItem("userId", loginData.login.user.id!);
      window.location.href = '/src/pages/dogPark.html';
    }
  });
});
