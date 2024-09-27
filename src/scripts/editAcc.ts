import "bootstrap/dist/css/bootstrap.min.css";
import {doGraphQLFetch} from "../graphql/fetch";
import {deleteUser, updateUser, userById} from "../graphql/queries";
import ModifyMessageResponse from "../interfaces/ModifyMessageResponse";
import DeleteMessageResponse from "../interfaces/DeleteMessageResponse";
//import { User } from "../interfaces/User";

const apiURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');
const userId = localStorage.getItem("userId");

if (!token) {
  throw Error('user does not have a token')
}

const modifyButton = document.querySelector(
  "#modifyButton"
) as HTMLButtonElement;

const deleteButton = document.querySelector(
  "#deleteButton"
) as HTMLButtonElement;

modifyButton.addEventListener("click", async () => {
  const modifyForm = document.querySelector("#userForm") as HTMLFormElement;
  const modifyInfo = document.querySelector("#modifyInfo") as HTMLElement;

  modifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = (await doGraphQLFetch(apiURL, userById, {
      userByIdId: userId
    }));
    const username = user.userById.username;

    const passwordForm = modifyForm.querySelector("#password") as HTMLInputElement;
    const passwordInput = passwordForm.value;

    const modifyData = (await doGraphQLFetch(apiURL, updateUser,
      {user: {
      username: username,
      password: passwordInput
      }},
      token)) as ModifyMessageResponse;

    if (modifyData) {
      modifyInfo.textContent = "Tiedot päivitetty";
    } else {
      modifyInfo.textContent = "Tietojen päivitys epäonnistui";
    }
  });
});

deleteButton.addEventListener("click", async () => {
  const userId = localStorage.getItem('userId');

  const deleteData = (await doGraphQLFetch(apiURL, deleteUser, {
    deleteUserId: userId
  }, token)) as DeleteMessageResponse;

  console.log(deleteData);

  if (deleteData) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = "/";
  }
});
