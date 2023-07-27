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
  const tdNode0 = td(values[0]);
  const tdNode1 = td(values[1]);
  const tdNode2 = td(values[2]);
  const tdNode3 = td(util.formatRelativeTime(values[3]));
  const tdNode4 = td(util.formatRelativeTime(values[4]));
  trNode.append(tdNode0, tdNode1, tdNode2, tdNode3, tdNode4);
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

function td(data) {
  const tdNode = document.createElement("td");
  const textNode = document.createTextNode(data);
  tdNode.appendChild(textNode);
  return tdNode;
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

function reRenderTable(sortedCarData) {
  const main = document.getElementById("main");
  main.innerHTML = "";
  main.appendChild(createTable(sortedCarData));
}

export default { Table };
