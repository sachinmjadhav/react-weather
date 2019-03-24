function pad(time) {
  if (time < 10) {
    time = `0${time}`;
  }
  return `${time}`;
}

// function to get the provided timestamp in string
export default function getTime(timestamp) {
  const currTime = new Date(timestamp * 1000);
  return `${pad(currTime.getHours())}:${pad(currTime.getMinutes())}`;
}

export function getDate(timestamp) {
  const dateString = new Date(timestamp * 1000);
  return `${dateString.toLocaleDateString()}`;
}
