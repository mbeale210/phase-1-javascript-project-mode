// our javascript code goes here
const API = "file://wsl.localhost/Ubuntu/home/mbeale/Development/code/phase-1/phase-1-javascript-project-mode/db.json"
const godsDiv = document.getElementById("display");

const displayGods = () => {
  fetch(API)
    .then((res) => res.json())
    .then(godsInfo);

};
// db.json populated from api source:https://github.com/betalantz/json-server-collection/blob/main/greek-mythology/db.json