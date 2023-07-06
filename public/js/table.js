function Table() {
  const testData = [
    {
      name: "A",
      age: 5,
      type: "hyper!",
    },
    {
      name: "A",
      age: 5,
      type: "hyper!",
    },
    {
      name: "A",
      age: 5,
      type: "hyper!",
    },
    {
      name: "A",
      age: 5,
      type: "hyper!",
    },
    {
      name: "A",
      age: 5,
      type: "hyper!",
    },
  ];

  const tableNode = document.createElement("table");
  tableNode.appendChild(thead(testData[0]));
  tableNode.appendChild(tbody(testData));

  return tableNode;
}

function thead(firstDataObject) {
  const theadNode = document.createElement("thead");
  const trHeadNode = document.createElement("tr");
  const keys = Object.keys(firstDataObject);
  keys.forEach((element) => {
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

export default { Table };
