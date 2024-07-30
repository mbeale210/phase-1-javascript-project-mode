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

    const likeButton = createLikeButton (god);
    godCard.appendChild(likeButton);

    godGrid.appendChild(godCard);
    
  });
}

function createLikeButton(god) {
  const likeButton = document.createElement("button");
  likeButton.classList.add("like-button");
  likeButton.textContent = "like 🏛";
  likeButton.addEventListener("click", () => console.log(`${god.name} was liked`))
  return likeButton;
}

fetchGods().then((gods) => {
  renderGodCards(gods);
});





document.addEventListener("DOMContentLoaded", () => {
  const godsForm = document.getElementById("search-god");
  godsForm.addEventListener("submit", parentsSearch);

  async function parentsSearch(e) {
    e.preventDefault(); 

    const godNameInput = document.getElementById("god-name").value;

    try {
      
      const response = await fetch("http://localhost:3000/gods");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const gods = await response.json();

      const result = gods.find(
        (god) => god.name.toLowerCase() === godNameInput.toLowerCase()
      );

      const displayDiv = document.getElementById("display");
      displayDiv.innerHTML = "<h2>Display</h2>"; 

      if (result) {
        displayDiv.innerHTML += `
          <div class="god-card">
            <img src="${result.url}" alt="${result.name}" style="width: 150px; height: auto;">
            <p><strong>Name:</strong> ${result.name}</p>
          </div>
        `;
      } else {
        displayDiv.innerHTML += "<p>No matching god found.</p>";
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      const displayDiv = document.getElementById("display");
      displayDiv.innerHTML =
        "<h2>Display</h2><p>There was an error fetching the data.</p>";
    }
  }
});