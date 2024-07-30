function fetchGods() {
  return fetch('http://localhost:3000/gods')
    .then(response => response.json());
}

function renderGodCards(gods) {
  const godGrid = document.getElementById('god-grid');

  godGrid.innerHTML = '';

  gods.forEach((god) => {
    const godCard = document.createElement('div');
    godCard.classList.add('god-card');

    const godImage = document.createElement('img');
    godImage.src = gods.url;
    godImage.alt = gods.name;
    godCard.appendChild(godImage);

    const godName = document.createElement('p');
    godName.textContent = gods.name;
    godCard.appendChild(godName);

    godGrid.appendChild(godCard);
  });
}
fetchGods()
  .then(gods => {
    renderGodCards(gods);
  })