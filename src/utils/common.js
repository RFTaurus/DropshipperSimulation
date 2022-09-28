export function sortArr(arr) {
  return arr.sort(
    (firstItems, nextItem) =>
      Number(firstItems.number) - Number(nextItem.number)
  );
}

export function randomString(length = 5) {
  const AcceptedChar = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i) {
    result += AcceptedChar[Math.floor(Math.random() * AcceptedChar.length)];
  }
  return result;
}

export const formatCurrency = (value) => {
  let valueString = "";
  const values = `${value}`;
  if (values.includes(".")) {
    const temp = values.split(".");
    valueString = temp[0];
  } else {
    valueString = `${value}`;
  }

  const fragment = valueString.length % 3;
  const nDot = Math.floor(valueString.length / 3);
  let resValue = "";
  let iStart = 0;
  if (nDot > 0) {
    if (fragment > 0) {
      resValue = valueString.substr(0, fragment);
    } else {
      resValue = valueString.substr(0, 3);
      iStart = 1;
    }
    for (let i = iStart; i < nDot; i += 1) {
      resValue += `.${valueString.substr(fragment + i * 3, 3)}`;
    }
  } else {
    resValue = valueString;
  }

  return `${resValue}`;
};
