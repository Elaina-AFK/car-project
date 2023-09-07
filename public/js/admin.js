await main();

// -------------------------------------------

async function main() {
  const data = await getMember();
  adminTable(data);
}

// -------------------------------------------
function thead(thNodeList) {
  const theadNode = document.createElement("thead");
  theadNode.append(...thNodeList);
  return theadNode;
}

function th(node) {
  const thNode = document.createElement("th");
  thNode.appendChild(node);
  return thNode;
}

function tbody(trNodeList) {
  const tbodyNode = document.createElement("tbody");
  tbodyNode.append(...trNodeList);
  return tbodyNode;
}

function tr(tdNodeList) {
  const trNode = document.createElement("tr");
  trNode.append(...tdNodeList);
  return trNode;
}

function td(node) {
  const tdNode = document.createElement("td");
  tdNode.appendChild(node);
  return tdNode;
}

function textNode(text) {
  const txtNode = document.createTextNode(text);
  return txtNode;
}

// -------------------------------------------
function adminTable(data) {
  const table = document.getElementById("users");
  table.classList = "table table-striped table-hover";
  const head1 = th(textNode("users"));
  const head2 = th(textNode("role"));
  const action = th(textNode("action"));
  const theadNode = thead([head1, head2, action]);

  const tbodyNode = tbody(
    data.map((user) => {
      const td1 = td(textNode(user.username));
      const td2 = td(textNode(user.role));
      const trNode = tr([td1, td2]);
      trNode.id = user.id;
      return trNode;
    })
  );

  table.appendChild(theadNode);
  table.appendChild(tbodyNode);
}

async function getMember() {
  const data = await fetch("/api/member");
  return data.json();
}
