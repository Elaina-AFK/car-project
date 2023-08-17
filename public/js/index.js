import Table from "./table.js";

const mainDiv = document.getElementById("main");
const logout = document.getElementById("logout");

mainDiv.appendChild(await Table.Table());
logout.addEventListener("click", () => {
  fetch("/api/logout")
    .then((res) => res.json())
    .then((res) => {
      document.body.innerHTML = res.message;
    });
});
