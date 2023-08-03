import util from "./util.js";

let sortedState = "h2l";

async function Table() {
  const carData = await getData();
  carData.forEach((car) => {
    car["added"] = new Date(car["added"]);
    car["modified"] = new Date(car["modified"]);
  });
  return createTable(carData);
}

function createTable(carData) {
  const tableNode = document.createElement("table");
  tableNode.classList = "table table-striped table-hover";
  const titleList = [
    { name: "Name", keyName: "name", type: "String" },
    { name: "Price", keyName: "price", type: "Number" },
    { name: "Year", keyName: "year", type: "Number" },
    { name: "Added Date", keyName: "added", type: "Date" },
    { name: "Modified Date", keyName: "modified", type: "Date" },
    { name: "", keyName: "", type: "" },
    { name: "", keyName: "", type: "" },
  ];
  tableNode.appendChild(thead(titleList, carData));
  tableNode.appendChild(tbody(carData));

  return tableNode;
}

function thead(titleList, data) {
  const theadNode = document.createElement("thead");
  const trHeadNode = thRow(titleList, data);
  theadNode.appendChild(trHeadNode);
  return theadNode;
}

function thRow(titleList, data) {
  const trNode = document.createElement("tr");
  titleList.forEach((element) => {
    const thNode = th(element, data);
    trNode.appendChild(thNode);
  });
  return trNode;
}

function tbody(mainData) {
  const tBodyNode = document.createElement("tbody");
  mainData.forEach((element) => {
    const trNode = tr(element);
    tBodyNode.appendChild(trNode);
  });
  return tBodyNode;
}

function tr(eachDataObject) {
  const trNode = document.createElement("tr");
  const values = Object.values(eachDataObject);
  const tdNode0 = tdText(values[0]);
  const tdNode1 = tdText(values[1]);
  const tdNode2 = tdText(values[2]);
  const tdNode3 = tdText(util.formatRelativeTime(values[3]));
  const tdNode4 = tdText(util.formatRelativeTime(values[4]));
  const editBtn = btn("Edit");
  const tdNode5 = td(editBtn);
  const deleteBtn = btn("Delete");
  deleteBtn.addEventListener("click", () => onDelete(trNode));
  const tdNode6 = td(deleteBtn);
  trNode.append(tdNode0, tdNode1, tdNode2, tdNode3, tdNode4, tdNode5, tdNode6);
  editBtn.addEventListener("click", () =>
    onEdit(tdNode5, tdNode0, tdNode1, tdNode2)
  );
  return trNode;
}

function th(title, data) {
  const thNode = document.createElement("th");
  const textNode = document.createTextNode(title.name);
  thNode.appendChild(textNode);
  if (title.type === "Number" || title.type === "Date") {
    thNode.addEventListener("click", () => {
      let sorted = util.sortNumber(data, title.keyName);
      if (sortedState === "h2l") {
        sorted = sorted.reverse();
      }
      sortedState = switchState(sortedState);
      reRenderTable(sorted);
    });
  } else if (title.type === "String") {
    thNode.addEventListener("click", () => {
      let sorted = util.sortString(data, title.keyName);
      if (sortedState === "h2l") {
        sorted = sorted.reverse();
      }
      sortedState = switchState(sortedState);
      reRenderTable(sorted);
    });
  }
  return thNode;
}

function input(name, defaultValue) {
  const input = document.createElement("input");
  input.defaultValue = defaultValue;
  input.name = name;
  return input;
}

function tdText(data) {
  const textNode = document.createTextNode(data);
  const tdNode = td(textNode);
  return tdNode;
}

function td(node) {
  const tdNode = document.createElement("td");
  tdNode.appendChild(node);
  return tdNode;
}

function btn(text) {
  const button = document.createElement("button");
  button.innerHTML = text;
  return button;
}

async function getData() {
  const res = await fetch("/api/carData");
  try {
    const data = await res.json();
    return data;
  } catch (e) {
    document.location.href = "/login";
    return;
  }
}

function switchState(state) {
  if (state === "l2h") {
    return "h2l";
  }
  if (state === "h2l") {
    return "l2h";
  }
}

function onEdit(editNode, nameNode, priceNode, yearNode) {
  const name = nameNode.innerHTML;
  const price = priceNode.innerHTML;
  const year = yearNode.innerHTML;
  nameNode.innerHTML = "";
  priceNode.innerHTML = "";
  yearNode.innerHTML = "";
  const nameInput = input("name", name);
  nameNode.appendChild(nameInput);
  const priceInput = input("price", price);
  priceNode.appendChild(priceInput);
  const yearInput = input("year", year);
  yearNode.appendChild(yearInput);
  editNode.innerHTML = "";
  const updateBtn = btn("Update");
  updateBtn.addEventListener("click", () => {
    nameNode.innerHTML = nameInput.value;
    priceNode.innerHTML = priceInput.value;
    yearNode.innerHTML = yearInput.value;
    editNode.innerHTML = "";
    editNode.appendChild(addEditBtn(editNode, nameNode, priceNode, yearNode));
  });
  editNode.appendChild(updateBtn);
  const cancelBtn = btn("Cancel");
  editNode.appendChild(cancelBtn);
  cancelBtn.addEventListener("click", () => {
    nameNode.innerHTML = name;
    priceNode.innerHTML = price;
    yearNode.innerHTML = year;
    editNode.innerHTML = "";
    editNode.appendChild(addEditBtn(editNode, nameNode, priceNode, yearNode));
  });
}

function addEditBtn(parentNode, nameNode, priceNode, yearNode) {
  const editBtn = btn("Edit");
  editBtn.addEventListener("click", () =>
    onEdit(parentNode, nameNode, priceNode, yearNode)
  );
  return editBtn;
}

function onDelete(trNode) {
  trNode.outerHTML = "";
}

function reRenderTable(sortedCarData) {
  const main = document.getElementById("main");
  main.innerHTML = "";
  main.appendChild(createTable(sortedCarData));
}

export default { Table };
