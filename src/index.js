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
    godCard.setAttribute("data-god-id", god.id);
    
    const godImage = document.createElement("img");
    godImage.src = god.url;
    godImage.alt = god.name;
    godCard.appendChild(godImage);

    const godName = document.createElement("p");
    godName.textContent = god.name;
    godCard.appendChild(godName);

    const likeButton = createLikeButton(god);
    godCard.appendChild(likeButton);

    const like = createLike(god);
    godCard.appendChild(like);

    godGrid.appendChild(godCard);
  });
}

fetchGods().then((gods) => {
  renderGodCards(gods);
});


function createLikeButton(god) {
  const likeButton = document.createElement("button");
  likeButton.classList.add("like-button");
  likeButton.textContent = "Like 🏛";

  let isLiked = false;

  likeButton.addEventListener("click", () => {
    isLiked = !isLiked; 

    if (isLiked) {
      likeButton.classList.add("liked");
    } else {
      likeButton.classList.remove("liked");
    }
  });
  return likeButton;
}
fetchGods().then((gods) => {s
  renderGodCards(gods);
});

function createLike(god) {
  const like = document.createElement("span");
  return like;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-god");
  const display = document.getElementById("display");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("new-name");
    const godName = nameInput.value;

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
          const father = gods.find((g) => g.name === god.father);
          const mother = gods.find((g) => g.name === god.mother);

          let parentInfo = "";
          if (father && mother) {
            if (
              father.father === mother.father &&
              father.mother === mother.mother
            ) {
              parentInfo = `<p>Like a lot of gods, the parents of ${god.name} (${god.father} and ${god.mother}) are related.</p>`;
            } else {
              parentInfo = `<p>The parents of ${god.name} (${god.father} and ${god.mother}) are not related.</p>`;
            }
          } else {
            parentInfo =
              "<p>Maybe your parents are related. Maybe they aren't. We just don't know.</p>";
          }

          display.innerHTML = `
            <h2>${god.name}</h2>
            <p>Roman Name: ${god.romanname}</p>
            <p>Power: ${god.power}</p>
            <p>Symbol: ${god.symbol}</p>
            <p>Father: ${god.father}</p>
            <p>Mother: ${god.mother}</p>
            <p>${parentInfo}</p>
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
