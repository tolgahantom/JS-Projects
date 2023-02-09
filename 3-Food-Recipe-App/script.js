const searchBtn = document.getElementById("search-btn");
const mainURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let generalFoodImageEl = document.querySelector("#image");
let generalFoodNameEl = document.querySelector(".food-name");

openDetailPage = (name) => {
  document.querySelector(".result-food-detail").classList.add("active");
  getFoodFromAPIByName(name);
};

getNameFromSearchBar = (callback) => {
  let foodName = document.getElementById("search-input").value;
  getFoodsFromAPI(foodName);
  document.getElementById("search-input").value = "";
};

searchBtn.addEventListener("click", getNameFromSearchBar);

getFoodsFromAPI = (name, callback) => {
  let URL = mainURL + name;
  fetch(URL)
    .then((resolve) => resolve.json())
    .then((data) => {
      showMeals(data.meals);
    });
};

getFoodFromAPIByName = (name, callback) => {
  let URL = mainURL + name;
  fetch(URL)
    .then((resolve) => resolve.json())
    .then((data) => {
      showDetail(data.meals[0]);
    });
};

getRecipeButtons = () => {
  let getRecipeBtn = document.querySelectorAll("#get-recipe");

  //GET RECIPE BUTTONS
  getRecipeBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      openDetailPage(
        e.target.parentElement.parentElement.childNodes[1].textContent
      );
      window.scrollTo(0, 0);
    });
  });
};

getCloseButton = () => {
  let closeBtn = document.getElementById("close-btn");

  closeDetailPage = () => {
    document.querySelector(".result-food-detail").classList.remove("active");
  };

  closeBtn.addEventListener("click", closeDetailPage);
};

showMeals = async (meals) => {
  for (let i = 0; i < meals.length; i++) {
    let container = `
    <div class="food-container">
      <div class="food-img">
        <img src="${meals[i].strMealThumb}" id="image" />
      </div>
      <div class="food-detail">
        <div class="food-name">${meals[i].strMeal}</div>
        <div class="get-button">
          <button type="button" class="btn" id="get-recipe">
            Get Recipe
          </button>
        </div>
      </div>
    </div>
    `;

    document.querySelector(".search-results").innerHTML += container;
  }
  //GET RECIPE BUTTONS
  await getRecipeButtons();
};

showDetail = async (meal) => {
  let detailEl = `
    <button class="close-btn" id="close-btn">
      <i class="fa-solid fa-x"></i>
    </button>
    <div class="detail-img">
      <img
        src="${meal.strMealThumb}"
      />
    </div>
    <div class="detail-detail">
      <div class="detail-food-name">${meal.strMeal}</div>
      <hr />
      <div class="detail-food-category">${meal.strCategory}</div>
      <hr />
      <div class="detail-food-tags">
        <div class="tag">${meal.strTags}</div>
      </div>
      <hr />
      <div class="detail-food-instruction">
        <div class="detail-food-instruction-title subtitle">
          Instruction
        </div>
        <div class="detail-food-instruction-content">
          ${meal.strInstructions}
        </div>
      </div>
      <hr />
      <div class="detail-food-ingredients">
        <div class="detail-food-ingredient-title subtitle">
          Ingredient
        </div>
        <ul class="ingredient-list">
          <li class="ingredient-item">${meal.strIngredient1}</li>
        </ul>
      </div>
      <hr />
      <div class="detail-food-video">
        <iframe
          src="${meal.strYoutube}"
          frameborder="0"
          width="450"
          height="300"
        ></iframe>
      </div>
    </div>
  `;

  document.querySelector(".result-food-detail").innerHTML = detailEl;

  //CLOSE BUTTON
  await getCloseButton();
};
