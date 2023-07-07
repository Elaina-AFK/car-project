function sortString(dataObject, keyName) {
  const sorted = dataObject.sort((a, b) =>
    a[keyName].localeCompare(b[keyName])
  );
  return sorted;
}

function sortNumber(dataObject, keyName) {
  const sorted = dataObject.sort((a, b) => a[keyName] - b[keyName]);
  return sorted;
}

function formatRelativeTime(date) {
  const formatter = new Intl.RelativeTimeFormat("en");
  const now = new Date();
  const diff = now - date;
  const x = formatter.format(Math.round(-diff / (1000 * 60 * 60 * 24)), "days");
  return x;
}

export default { sortString, sortNumber, formatRelativeTime };
