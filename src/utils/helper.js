export const timeFormatter = (obj) => {
  const m2Value = new Date(obj);
  const timeString = m2Value.toLocaleTimeString("en-US");
  console.log(timeString);
  return timeString;
};

export const dateFormatter = (obj) => {
  const m2Value = new Date(obj);
  const dateString = m2Value.toLocaleDateString("en-US");
  console.log(dateString);
  return dateString;
};

export const delay = (time) => {
  return setTimeout(() => {}, time);
};
