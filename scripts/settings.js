const themeToggler = document.querySelector("#themetoggler");
const add = document.querySelector("#add");
const hour12Toggler = document.querySelector("#hour12toggler");
let currentTheme, hour12;

function setTheme(theme) {
  const container = document.querySelector("#container");
  container.classList.remove(theme === "light" ? "dark" : "light");
  container.classList.add(theme);
  currentTheme = theme;
}

function setHour12(is12) {
  hour12 = is12;
}

function getSettings(hour12Key, themeKey) {
  let hour12, currentThemeString;
  try {
    const hour12String = localStorage.getItem(hour12Key) === "true" ? "true" : "false";
    currentThemeString = localStorage.getItem(themeKey) === "light" ? "light" : "dark";
    hour12 = JSON.parse(hour12String);
  } catch (err) {
    hour12 = true;
    console.log(err);
  }
  return { hour12, currentTheme: currentThemeString };
}

function updateSettings() {
  localStorage.setItem("theme", currentTheme);
  localStorage.setItem("hour12", hour12);
}

function initSettings() {
  const icon = currentTheme === "light" ? "🌙" : "☀️";
  themeToggler.innerText = icon;
  if (hour12) hour12Toggler.innerText = "Switch to 24Hr";
  else hour12Toggler.innerText = "Switch to 12Hr";
}

themeToggler.addEventListener("click", () => {
  const theme = currentTheme === "light" ? "dark" : "light";
  const icon = currentTheme === "light" ? "☀️" : "🌙";
  themeToggler.innerText = icon;
  setTheme(theme);
});

add.addEventListener("click", () => {
  pickAndEdit([[clockStore, clockStore.length]], initClocks);
});

hour12Toggler.addEventListener("click", () => {
  if (hour12) hour12Toggler.innerText = "Switch to 12Hr";
  else hour12Toggler.innerText = "Switch to 24Hr";
  setHour12(!hour12);
});
