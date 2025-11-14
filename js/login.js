window.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password");

  button.addEventListener("click", () => {
    window.location.href = "./verification.html";
  });
});
