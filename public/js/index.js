import Table from "./table.js";
import addForm from "./addForm.js";

const mainDiv = document.getElementById("main");
const addFormDiv = document.getElementById("addForm");
const logout = document.getElementById("logout");

mainDiv.appendChild(await Table.Table());
addFormDiv.appendChild(addForm.addForm());
logout.addEventListener("click", () => {
  fetch("/api/logout")
    .then((res) => res.json())
    .then((res) => {
      document.body.innerHTML = res.message;
    });
});
