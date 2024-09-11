import { doGraphQLFetch } from "../graphql/fetch"
import { createUser, login, userByUsername } from "../graphql/queries"
import LoginMessageResponse from "../interfaces/LoginMessageResponse";
import RegisterMessageResponse from "../interfaces/RegisterMessageResponse"
import { UserQuery } from "../interfaces/User";

const apiURL = import.meta.env.VITE_API_URL;

const registerButton = document.querySelector(
  "#registerButton"
) as HTMLElement;

// account creation and login handling
registerButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const registerForm = document.querySelector("#userContent") as HTMLFormElement;
  const username = registerForm.querySelector("#username") as HTMLInputElement;
  const password = registerForm.querySelector("#password") as HTMLInputElement;
  const nameInput = username.value;
  const passInput = password.value;

  try {
    // checking if the username already exist
    const existingUser = (await doGraphQLFetch(apiURL, userByUsername, {
      username: nameInput
    })) as UserQuery;

    if (!existingUser.userByUsername) {
      // creating user if a username is free
      (await doGraphQLFetch(apiURL, createUser, {
          user: {
            username: nameInput,
            password: passInput
          }
      })) as RegisterMessageResponse;

      // logging in the new user
      const loginData = (await doGraphQLFetch(apiURL, login, {
        username: nameInput,
        password: passInput,
      })) as LoginMessageResponse;

      // setting the login data of a user into local storage and redirecting the user to the main page
      localStorage.setItem("token", loginData.login.token!);
      localStorage.setItem("userId", loginData.login.user.id!);
      window.location.href = '/src/pages/dogPark.html';
    } else {
      // asks user to select another username in case the username is already in use
      const regInfo = document.querySelector("#regInfo") as HTMLElement;
      if (regInfo) {
        regInfo.textContent = `Valitse toinen käyttäjätunnus`;
      }
    }
  } catch (error) {
    console.log('Account creation failed');
  }
});
