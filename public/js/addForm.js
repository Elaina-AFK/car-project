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

  form.onSubmit = () => console.log("Heyyyyyy!");

  return form;
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
