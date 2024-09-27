const logoutBtns = document.querySelectorAll(".logout");

logoutBtns!.forEach(button => {
  button.addEventListener("click", async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  });
});

export {};
