const logoutBtn = document.querySelector("#navContentPageLogout");

logoutBtn!.addEventListener("click", async ()=> {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
});

export {};