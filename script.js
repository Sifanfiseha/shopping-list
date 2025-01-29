const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
// add items
function displayItems() {
  const items = getItemFromStorage();
  items.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("please add an item!");
    return;
  }
  // create a new list element
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  itemInput.value = "";
  checkUI();
}
function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  li.appendChild(button);
  itemList.append(li);
}
function addItemToStorage(item) {
  const itemFromStorage = getItemFromStorage();
  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}
function getItemFromStorage() {
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  return button;
}
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}
// remove items
function removeItem(item) {
  if (confirm("Are you sure?")) {
    // remove item from the DOM
    item.remove();
    //remove item from the storage
    removeItemFromStorage(item.firstChild.textContent);
  }
  checkUI();
}
function removeItemFromStorage(item) {
  let itemFromStorage = getItemFromStorage();
  // filter out item to be removed
  itemFromStorage = itemFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}
function cleraItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  cleraItemsFromLocalStorage();
  checkUI();
}
function cleraItemsFromLocalStorage() {
  //   let itemFromStorage = getItemFromStorage();
  //   itemFromStorage = [];
  //   localStorage.setItem("items", JSON.stringify(itemFromStorage));
  localStorage.removeItem("items");
}
function checkUI() {
  let items = document.querySelectorAll("li");
  if (items.length == 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}
function filterItems(e) {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      console.log(true);
      item.style.display = "flex";
    } else {
      console.log(false);
      item.style.display = "none";
    }
  });
  console.log(text);
  console.log(items);
}
function init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", cleraItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}

init();
