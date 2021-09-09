let clockStore = [];

function getStore(storeKey) {
  let store = [];
  try {
    const storeString = localStorage.getItem(storeKey);
    store = JSON.parse(storeString);
    if (!Array.isArray(store)) throw new Error("Store is not Array");
  } catch (err) {
    store = [];
    console.log(err);
  }
  return store;
}

function updateStore(store, storeKey) {
  let storeString = "";
  try {
    storeString = JSON.stringify(store);
  } catch (err) {
    storeString = "";
    console.log(err);
  }
  localStorage.setItem(storeKey, storeString);
}

function removeFromStore(index) {
  clockStore = clockStore.filter((clock, i) => i !== index);
}

function addToStore(clock) {
  clockStore.push(clock);
}
