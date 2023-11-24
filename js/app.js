const getMeals = (iputText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${iputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showMeals(data.meals));
};

const showMeals = (meals) => {
  const mealSection = document.getElementById("meals-container");
  mealSection.innerHTML = "";
  meals.forEach((meal) => {
    // console.log(meal.idMeal)
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
      <div class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="">
          <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.</p>
              <button onclick="showMealDetails('${meal.idMeal}')" type="button" class="btn btn-primary"     data-bs-toggle="modal" data-bs-target="#meal-details">
                Details
              </button>

          </div>
      </div>
      `;
    mealSection.appendChild(mealDiv);
    loader(false);
  });
};

document.getElementById("search-btn").addEventListener("click", function () {
  const inputText = document.getElementById("input").value;
  getMeals(inputText);
  loader(true);
});

// document.getElementById("input").addEventListener("keyup", function (event) {
//   const searchText = event.target.value;
//   getMeals(searchText);
//   loader(true);
// });

document.getElementById("input").addEventListener("keypress", function(e){
  if(e.key === 'Enter'){
    const inputText = document.getElementById("input").value;
    getMeals(inputText);
    loader(true);
  }
})

const showMealDetails = (idMeal) => {
  // console.log(idMeal);
  // loader(true);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => modalDetails(data.meals[0]));
};

const modalDetails = meal => {
    // console.log(meal)
  const mealDetails = document.getElementById("meal-details");
  mealDetails.innerHTML = "";
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-dialog", "modal-dialog-centered");
  modalDiv.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Meal - ${meal.idMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <img class="img-thumbnail" src="${meal.strMealThumb}">
        <h3>Name : ${meal.strMeal} </h3>
        <p>Category : ${meal.strCategory} </p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
</div>
    `;
    mealDetails.appendChild(modalDiv);
    // loader(false);
};

const loader = isLoading => {
  const loaderSection = document.getElementById("loader");
  if(isLoading){
    loaderSection.classList.remove("d-none");
  }else{
    loaderSection.classList.add("d-none")
  }
}

getMeals("fish");
