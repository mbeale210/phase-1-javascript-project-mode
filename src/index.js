//json-server --watch db.json
function fetchGods() {
  return fetch("http://localhost:3000/gods").then((response) =>
    response.json()
  );
}

function renderGodCards(gods) {
  const godGrid = document.getElementById("god-grid");

  godGrid.innerHTML = "";

  gods.forEach((god) => {
    const godCard = document.createElement("div");
    godCard.classList.add("god-card");

    const godImage = document.createElement("img");
    godImage.src = god.url;
    godImage.alt = god.name;
    godCard.appendChild(godImage);

    const godName = document.createElement("p");
    godName.textContent = god.name;
    godCard.appendChild(godName);

    godGrid.appendChild(godCard);
  });
}
fetchGods().then((gods) => {
  renderGodCards(gods);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-god");
  const display = document.getElementById("display");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("new-name");
    const godName = nameInput.value.trim();

    if (godName) {
      try {
        const response = await fetch("http://localhost:3000/gods");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const gods = await response.json();

        const god = gods.find(
          (g) => g.name.toLowerCase() === godName.toLowerCase()
        );

        if (god) {
          display.innerHTML = `
            <h2>${god.name}</h2>
            <p>Roman Name: ${god.romanname}</p>
            <p>Power: ${god.power}</p>
            <p>Symbol: ${god.symbol}</p>
            <p>Father: ${god.father}</p>
            <p>Mother: ${god.mother}</p>
            <img src="${god.url}" alt="${god.name}" style="max-width: 300px;">
          `;
        } else {
          display.innerHTML = "<p>No god found with that name.</p>";
        }
      } catch (error) {
        console.error("Error:", error);
        display.innerHTML = "<p>An error occurred while fetching the data.</p>";
      }
    } else {
      display.innerHTML = "<p>Please enter a god's name.</p>";
    }
  });
});
