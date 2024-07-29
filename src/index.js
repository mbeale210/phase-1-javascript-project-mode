
const godsAPI = "http://localhost:3000/gods";
const godsDiv = document.getElementById("display");
const godsName = document.getElementById("god-name");

fetch(godsAPI)
  .then((res) => res.json())
  .then(renderGods);

function renderGods(gods) {
  gods.forEach(renderGod);
}

function renderGod(god) {
  const godsImageElement = document.createElement("img");
  godsImageElement.src = gods.url;
  godsDiv.append(godsImageElement);
}

// db.json populated from api source:https://github.com/betalantz/json-server-collection/blob/main/greek-mythology/db.json
