//======================== Create a Clock Element ============================
function createClockElement(prefix) {
  const clockContainer = document.createElement("div");
  clockContainer.id = `clock-container`;
  clockContainer.classList.add("date-container");
  clockContainer.setAttribute("data-prefix", prefix);

  const dateElement = document.createElement("span");
  dateElement.id = `date`;
  dateElement.classList.add("date");

  const buttonGroupElement = document.createElement("div");
  buttonGroupElement.id = "button-group";
  buttonGroupElement.classList.add("button-group");

  const tzEdit = document.createElement("button");
  tzEdit.id = `tzedit`;
  tzEdit.innerText = "Edit";
  tzEdit.classList.add("edit");
  tzEdit.addEventListener("click", () => pickAndEdit([[clockStore, prefix]]));

  const removeElement = document.createElement("button");
  removeElement.id = `remove`;
  removeElement.innerText = "Remove";
  removeElement.classList.add("remove");
  removeElement.addEventListener("click", () => {
    removeFromStore(prefix);
    initClocks();
  });

  buttonGroupElement.appendChild(tzEdit);
  buttonGroupElement.appendChild(removeElement);

  const timeElement = document.createElement("span");
  timeElement.id = `time`;
  timeElement.classList.add("time");

  const periodElement = document.createElement("span");
  periodElement.id = `period`;
  periodElement.classList.add("period");

  const tzElement = document.createElement("span");
  tzElement.id = `tz`;
  tzElement.classList.add("timezone");

  clockContainer.appendChild(dateElement);
  clockContainer.appendChild(buttonGroupElement);
  clockContainer.appendChild(timeElement);
  clockContainer.appendChild(periodElement);
  clockContainer.appendChild(tzElement);

  return clockContainer;
}
//============================================================================

//======================== Re-Renders All Clock Elements ============================
function initClocks() {
  const clockContainerParent = document.getElementById("innercontainer");
  clockContainerParent.innerHTML = "";
  clockStore.forEach((clock, prefix) => {
    const clockElement = createClockElement(prefix);
    clockContainerParent.appendChild(clockElement);
  });
  renderClocks();
}
//====================================================================================

//======================== Updates All Clock Element Values ============================
function renderClocks() {
  clockStore.forEach((clock, prefix) => {
    let clockContainer = document.querySelector(`[data-prefix='${prefix}']`);
    if (!clockContainer) {
      return;
    }
    const dateElement = clockContainer.querySelector(`#date`);
    const timeElement = clockContainer.querySelector(`#time`);
    const periodElement = clockContainer.querySelector(`#period`);
    const tzElement = clockContainer.querySelector(`#tz`);
    const date = new Date();
    const dateString = date.toLocaleDateString("en-US", { timeZone: clock });
    let timeString = date.toLocaleTimeString("en-US", {
      timeZone: clock,
      ...(hour12 && { hour12 }),
      ...(!hour12 && { hourCycle: "h23" }),
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    let periodString = "NA";
    if (hour12) {
      const matches = timeString.match(/(.+)? ([A|a|P|p]M)/);
      if (matches) {
        timeString = matches[1] ?? timeString;
        periodString = matches[2] ?? periodString;
      }
    }
    dateElement.innerText = dateString;
    timeElement.innerText = timeString;
    periodElement.innerText = periodString;
    tzElement.innerText = clock.length > 18 ? clock.substr(0, 15) + "..." : clock;
    tzElement.title = clock;
    if (periodString === "NA") periodElement.style.opacity = "0";
    else periodElement.style.opacity = "1";
  });
}
//====================================================================================

//======================== Init ============================
window.addEventListener("load", () => {
  tzPickerInit(TZ_DATA, document.querySelector("#container"));
  clockStore = getStore("clockstore");
  let settings = getSettings("hour12", "theme");
  currentTheme = settings.currentTheme;
  hour12 = settings.hour12;
  initSettings();
  setTheme(currentTheme);
  initClocks();
  const intervalID = setInterval(() => renderClocks(), 1000);
  window.addEventListener("unload", () => {
    updateStore(clockStore, "clockstore");
    updateSettings();
    clearInterval(intervalID);
  });
});
//===========================================================
