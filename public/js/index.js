import Table from "./table.js";
import addForm from "./addForm.js";

const mainDiv = document.getElementById("main");
const addFormDiv = document.getElementById("addForm");

mainDiv.appendChild(await Table.Table());
addFormDiv.appendChild(addForm.addForm());
