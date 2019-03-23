const pad = num => {
  return ("0" + num).slice(-2);
};

// export default function getTime(date) {
//   const currDate = new Date(date * 1000);
//   return `${pad(currDate.getHours())}:${pad(currDate.getMinutes())}:${pad(
//     currDate.getSeconds()
//   )}`;
// }

export default function getTime(date) {
  const currDate = new Date(date * 1000);
  return `${currDate.toLocaleTimeString()}`;
}
