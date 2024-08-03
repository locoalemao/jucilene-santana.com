document.addEventListener('DOMContentLoaded', function() {
  const queryParams = new URLSearchParams(window.location.search);
  const category = queryParams.get('category');

  if (category) {
      const categoryTitle = `Receitas de ${category}`;
      document.getElementById('category-title').innerText = categoryTitle;

      // Extracting the last word of the category for the tab title
      const lastWord = category.split(' ').pop();
      document.title = `${lastWord} | Jucilene Santana`;

      loadRecipes(category);
  }

  function loadRecipes(category) {
      const recipeContainer = document.getElementById('recipe-container');
      recipeContainer.innerHTML = '';

      const filteredRecipes = recipes.filter(recipe => recipe.category.includes(category));
      displayRecipes(filteredRecipes);
  }

  function displayRecipes(recipes) {
      const recipeContainer = document.getElementById('recipe-container');
      if (recipes.length === 0) {
          recipeContainer.innerHTML = '<p>Nenhuma receita encontrada para esta categoria.</p>';
          return;
      }

      const videoGrid = document.createElement('div');
      videoGrid.classList.add('video__grid');

      recipes.forEach(recipe => {
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('video__preview');

          recipeElement.innerHTML = `
              <div class="thumbnail__row">
                  <a href="${recipe.link}" target="_blank">
                      <img src="${recipe.image}" alt="${recipe.title}" class="thumbnail">
                      <div>
                          <h3 class="fav-recipes__title">${recipe.title}</h3>
                      </div>
                  </a>
              </div>
          `;

          videoGrid.appendChild(recipeElement);
      });

      recipeContainer.appendChild(videoGrid);

      // Add hover effect to the newly created elements
      const videoPreviews = document.querySelectorAll('.video__preview');

      videoPreviews.forEach((preview) => {
          const thumbnailRow = preview.querySelector('.thumbnail__row');
          
          preview.addEventListener('mouseenter', () => {
              thumbnailRow.style.transition = 'transform 0.4s';
              thumbnailRow.style.transform = 'scale(1.05) translateY(-5px)';
          });

          preview.addEventListener('mouseleave', () => {
              thumbnailRow.style.transition = 'transform 0.4s';
              thumbnailRow.style.transform = 'none';
          });
      });
  }
});
