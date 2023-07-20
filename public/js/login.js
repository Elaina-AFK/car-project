function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userData = Object.fromEntries(formData.entries());
  console.log(userData);
}

const Form = document.getElementById("loginForm");

Form.addEventListener("submit", handleSubmit);
