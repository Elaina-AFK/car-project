import api from "./api.js";

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userData = Object.fromEntries(formData.entries());
  console.log(userData);
  api.htmlMethod("POST", "/api/login", userData).then((res) => {
    if (res.message === "pass") {
      document.location.href = res.link;
      return;
    }
  });
}

function main() {
  const Form = document.getElementById("loginForm");
  Form.addEventListener("submit", handleSubmit);
}

main();
