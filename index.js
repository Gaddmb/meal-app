const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");

let meals = [];

// une function pour chercher les plats qui va s'occuper d'incrementé meals
const fetchMeals = async (search) => {
  //toujours mettre la logique d'un fetch dans une function
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    // tous qui a etait fait avant je vais l'appelé data
    // et stockées data.meals dans mon tableau
    .then((data) => (meals = data.meals));
  console.log(meals);
};

// une function pour afficher les plats
const mealsDisplay = () => {
  if (meals === null) {
    result.innerHTML = `<h2>Aucun resulat</h2>`;
  } else {
    // je limite l'afficahe de plat en faisant ci-dessous
    meals.length = 24;
    // chaque repas je vais l'appelle meal
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (let i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push(`<li>${ingredient} - ${measure}</li>`);
          }
        }

        return `
        <li class="card">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strArea}</p>
          <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
          <ul>${ingredients.join("")}</ul>
        </li>
        `;
      })
      .join("");
  }
};

// je vais chercher la valeur
input.addEventListener("input", (e) => {
  // .then(() => mealsDisplay())pour afficher en tant réel
  fetchMeals(e.target.value).then(() => mealsDisplay());
});

// quand l'utilisateur va valider sa rechercher a ce moment la la function mealDisplay rentre en action pour afficher les repas
form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});

// a retenir si jamais je mets des {} a map je dois faire un return au debut de ``
