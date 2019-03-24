// export default function getTime(date) {
//   const currDate = new Date(date * 1000);
//   return `${pad(currDate.getHours())}:${pad(currDate.getMinutes())}:${pad(
//     currDate.getSeconds()
//   )}`;
// }

// function to get the provided timestamp in string
export default function getTime(timestamp) {
  const currTime = new Date(timestamp * 1000);
  return `${currTime.getHours()}:${currTime.getMinutes()}`;
}

export function getDate(timestamp) {
  const dateString = new Date(timestamp * 1000);
  return `${dateString.toLocaleDateString()}`;
}
