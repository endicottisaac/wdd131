// Footer year and last modified
const yearSpan = document.getElementById('currentyear');
const lastModifiedSpan = document.getElementById('lastModified');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

// Weather wind chill calculation
function calculateWindChill(tempF, windMph) {
  return (
    35.74 + 0.6215 * tempF - 35.75 * Math.pow(windMph, 0.16) + 0.4275 * tempF * Math.pow(windMph, 0.16)
  ).toFixed(1);
}

const temp = 68; // static value in °F
const wind = 8; // static value in mph
const windChillSpan = document.getElementById('windChill');

if (temp <= 50 && wind > 3) {
  windChillSpan.textContent = calculateWindChill(temp, wind) + '°F';
} else {
  windChillSpan.textContent = 'N/A';
}
