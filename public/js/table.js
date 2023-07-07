async function Table() {
  const carData = await getData();
  const tableNode = document.createElement("table");
  tableNode.classList = "table table-striped table-hover";
  const titleList = ["name", "age", "very"];
  tableNode.appendChild(thead(titleList));
  tableNode.appendChild(tbody(carData));

  return tableNode;
}

function thead(titleList) {
  const theadNode = document.createElement("thead");
  const trHeadNode = document.createElement("tr");
  titleList.forEach((element) => {
    const thNode = th(element);
    trHeadNode.appendChild(thNode);
  });
  theadNode.appendChild(trHeadNode);
  return theadNode;
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
  values.forEach((element) => {
    const tdNode = td(element);
    trNode.appendChild(tdNode);
  });
  return trNode;
}

function th(title) {
  const thNode = document.createElement("th");
  const textNode = document.createTextNode(title);
  thNode.appendChild(textNode);
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
  const data = await res.json();
  return data;
}

export default { Table };
