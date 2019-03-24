function pad(time) {
  if (time < 10) {
    time = `0${time}`;
  }
  return `${time}`;
}

export default function getTime(timestamp) {
  const currTime = new Date(timestamp * 1000);
  return `${pad(currTime.getHours())}:${pad(currTime.getMinutes())}`;
}
