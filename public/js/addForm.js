import api from "./api.js";
import util from "./util.js";

function addForm() {
  const nameId = "nameField";
  const priceId = "priceField";
  const yearId = "yearOption";
  const form = document.createElement("form");
  const nameLabel = createLabelFor(nameId, "Name : ");
  const nameField = createFieldWithId(nameId);
  const priceLabel = createLabelFor(priceId, "Price : ");
  const priceField = createFieldWithId(priceId);
  const yearLabel = createLabelFor(yearId, "Year : ");
  const yearOption = yearSelector(yearId);
  const submit = submitButton();

  form.append(
    nameLabel,
    nameField,
    priceLabel,
    priceField,
    yearLabel,
    yearOption,
    submit
  );

  form.addEventListener("submit", async (e) =>
    getData(e, { nameId, priceId, yearId })
  );

  return form;
}

async function isAlrExist(name) {
  const response = await api.htmlMethod("POST", "/api/carData/carName", {
    name: name,
  });
  return response.status;
}

function verifyName(name) {
  return !util.isEmpty(name) && !isAlrExist(name);
}

function verifyPrice(price) {
  return !util.isEmpty(price) && !util.isNaN(price);
}

function verifyYear(year) {
  return !util.isEmpty(year);
}

async function getData(e, { nameId, priceId, yearId }) {
  e.preventDefault();
  const name = document.getElementById(nameId);
  const price = document.getElementById(priceId);
  const year = document.getElementById(yearId);
  if (!verifyName(name.value)) {
    return console.log("This name already exists!");
  }
  if (!verifyPrice(price.value)) {
    return console.log("Invalid price!");
  }
  if (!verifyYear(year.value)) {
    return console.log("Invalid year");
  }
  const data = {
    name: name.value,
    price: price.value,
    year: year.value,
  };
  name.value = "";
  price.value = "";
  year.value = "2023";
  const response = await postData(data);
  console.log(response.message);
}

async function postData(dataObject) {
  const response = await api.htmlMethod("POST", "/api/carData", dataObject);
  return response;
}

function yearSelector(id) {
  const select = document.createElement("select");
  const Now = new Date();
  const thisYear = Now.getFullYear();
  for (let i = 0; i < 100; i++) {
    const option = document.createElement("option");
    const optionText = thisYear - i;
    option.value = optionText;
    option.innerHTML = optionText;
    select.appendChild(option);
  }
  select.id = id;
  return select;
}

function submitButton() {
  const button = document.createElement("button");
  button.type = "submit";
  button.value = "Submit";
  button.innerHTML = "Submit";
  button.className = "button";
  return button;
}

function createFieldWithId(id) {
  const field = document.createElement("input");
  field.id = id;
  field.required = true;
  return field;
}

function createLabelFor(idFor, text) {
  const label = document.createElement("label");
  const textNode = document.createTextNode(text);
  label.htmlFor = idFor;
  label.appendChild(textNode);

  return label;
}

export default { addForm };
