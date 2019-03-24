// Beaufort Scale for wind speed

export default function windSpeed(num) {
  let wind;
  if (num < 0.5) {
    wind = "Calm";
  } else if (num > 0.5 && num <= 1.5) {
    wind = "Light Air";
  } else if (num > 1.5 && num <= 3.3) {
    wind = "Light Breeze";
  } else if (num > 3.3 && num <= 5.5) {
    wind = "Gentle Breeze";
  } else if (num > 5.5 && num <= 7.9) {
    wind = "Moderate Breeze";
  } else if (num > 7.9 && num <= 10.7) {
    wind = "Fresh Breeze";
  } else if (num > 10.7 && num <= 13.8) {
    wind = "Strong Breeze";
  } else if (num > 13.6 && num <= 17.1) {
    wind = "High Wind";
  } else if (num > 17.1 && num <= 20.7) {
    wind = "Gale";
  } else if (num > 20.7 && num <= 24.4) {
    wind = "Strong Gale";
  } else if (num > 24.4 && num <= 28.4) {
    wind = "Storm";
  } else if (num > 28.4 && num <= 32.6) {
    wind = "Violent Storm";
  } else if (num > 32.6) {
    wind = "Hurricane!!! RUN!!!";
  }
  return wind;
}
