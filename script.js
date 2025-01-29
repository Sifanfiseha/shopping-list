const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
// add items

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("please add an item!");
    return;
  }
  // create a new list element
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  console.log(li);
  const button = createButton("remove-item btn-link text-red");
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  li.appendChild(button);
  itemList.append(li);
  itemInput.value = "";
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
// remove items
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
}
function cleraItems() {
  console.log("click");
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}
// EventListeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", cleraItems);
