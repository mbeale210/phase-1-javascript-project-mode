fetch('http://localhost:3000/gods')
  .then(response => response.json())
  .then(data => {
    const gods = data;
    const godGrid = document.getElementById('god-grid');

    // Iterate over the gods array and create god cards
    gods.forEach(god => {
      const godCard = document.createElement('div');
      godCard.classList.add('god-card');

      const godImage = document.createElement('img');
      godImage.src = god.url;
      godImage.alt = god.name;
      godCard.appendChild(godImage);

      const godName = document.createElement('p');
      godName.textContent = god.name;
      godCard.appendChild(godName);

      const likeButton = document.createElement('button');
      likeButton.classList.add('like-button');
      likeButton.textContent = 'Like';
      godCard.appendChild(likeButton);

      godGrid.appendChild(godCard);
    });
  });