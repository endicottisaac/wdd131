// Recipe data
const recipes = [
  {
    id: 1,
    name: "Homemade Pastrami",
    description: "Flavorful pastrami, brined, smoked, and steamed cooked",
    category: "main",
    difficulty: "hard",
    prepTime: 60,
    cookTime: 480,
    servings: 8,
    ingredients: [
      "3 lbs beef brisket",
      "2 tbsp coriander seeds",
      "2 tbsp black peppercorns",
      "1 tbsp smoked paprika",
      "1 tbsp garlic powder",
    ],
    instructions: [
      "Cure the brisket with salt for 7-10 days",
      "Rinse and coat with spice rub",
      "Smoke at 225°F until tender until 155°F internal temp",
      "Steam until 200°F internal temp",
    ],
    notes:
      "Make sure to take your time with the smoke, also make sure oven is preheated and steamy",
    image: "images/pastrami.jpg",
  },
  {
    id: 2,
    name: "Elevated Instant Ramen",
    description: "Frozen Ramen that tastes like it is from a restaurant",
    category: "main",
    difficulty: "easy",
    prepTime: 5,
    cookTime: 15,
    servings: 1,
    ingredients: [
      "5 pounds beef bones",
      "1 soft-boiled egg",
      "2 slices green onion",
      "1 tsp sesame oil",
      "Nori sheet",
      "1 package of noodles",
      "6-10 cups water",
      "6 cloves garlic",
      "1 inch ginger",
      "2 scallions",
      "1 tbsp soy sauce",
    ],
    instructions: [
      "Cook beef bones in water with garlic, ginger, and scallions for 4-6 hours",
      "Strain broth and season with soy sauce",
      "Let broth cool, when cold put a portion in the bag",
      "Place noodles in the bag with broth",
      "Add soft-boiled egg",
      "Add vegetables and protein of choice to bag",
      "Garnish with green onions and nori",
    ],
    notes:
      "Place all ingredients in a vacuum bag, freeze, then when ready to eat, boil bag in water for 15 minutes",
    image: "images/ramen.jpg",
  },
  {
    id: 3,
    name: "Soup Dumplings",
    description: "Steamed dumplings filled with pork and a great broth",
    category: "appetizer",
    difficulty: "hard",
    prepTime: 120,
    cookTime: 20,
    servings: 6,
    ingredients: [
      "2 cups all-purpose flour",
      "1 lb ground pork",
      "2-5 pounds of pork bones for broth",
      "5 cloves garlic",
      "1 inch ginger",
      "2 scallions",
      "Salt for broth",
      "2 tbsp soy sauce",
      "1 tbsp ginger, minced",
    ],
    instructions: [
      "Make dough and let rest",
      "Make broth with pork bones, garlic, ginger, scallions, and salt",
      "Prepare pork filling",
      "Wrap dumplings carefully",
      "Steam for 8-10 minutes",
    ],
    notes:
      "Wrapping is the only technical part, all you can do is youtube and practice",
    image: "images/dumplings.jpg",
  },
  {
    id: 4,
    name: "Korean-Style Cured Bacon",
    description:
      "Sweet and savory bacon cured with Korean flavors like gochugaru and soy.",
    category: "main",
    difficulty: "medium",
    prepTime: 30,
    cookTime: 1440,
    servings: 6,
    ingredients: [
      "2 lbs pork belly",
      "1/4 cup coarse salt",
      "2 tbsp brown sugar",
      "1 tbsp gochugaru (Korean chili flakes)",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2/3 cup of gochuchang (Korean chili paste)",
    ],
    instructions: [
      "Mix salt, sugar, gochugaru, and gochuchang to create the cure",
      "Rub mixture on pork belly",
      "Cure in refrigerator for 3-5 days flipping daily",
      "Rinse and pat dry",
      "Smoke at 170°F until internal temp reaches 150°F",
      "Slice, then cook until crispy",
    ],
    notes: "The Korean spices make it insane with eggs",
    image: "images/korean-bacon.jpg",
  },
];

function getAllRecipes() {
  const userRecipes = localStorage.getItem("userRecipes");
  const userRecipesList = userRecipes ? JSON.parse(userRecipes) : [];
  return [...recipes, ...userRecipesList];
}

function saveUserRecipe(recipe) {
  const userRecipes = localStorage.getItem("userRecipes");
  const userRecipesList = userRecipes ? JSON.parse(userRecipes) : [];
  userRecipesList.push(recipe);
  localStorage.setItem("userRecipes", JSON.stringify(userRecipesList));
}

function updateYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function toggleNav() {
  const navList = document.querySelector(".nav-list");
  navList.classList.toggle("active");
}

function createRecipeCard(recipe) {
  const prepTime = recipe.prepTime ? `${recipe.prepTime}m prep` : "";
  const cookTime = recipe.cookTime ? `${recipe.cookTime}m cook` : "";
  const servings = recipe.servings ? `${recipe.servings} servings` : "";
  const metaInfo = [prepTime, cookTime, servings]
    .filter((info) => info)
    .join(" • ");

  return `
    <div class="recipe-card" onclick="toggleRecipeDetails(${recipe.id})">
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy" />
      <div class="recipe-content">
        <h3>${recipe.name}</h3>
        ${metaInfo ? `<div class="recipe-meta">${metaInfo}</div>` : ""}
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-tags">
          <span class="recipe-tag">${recipe.category}</span>
          <span class="recipe-tag">${recipe.difficulty}</span>
        </div>
        <div class="recipe-details" id="details-${recipe.id}" style="display: none;">
          <h4>Ingredients:</h4>
          <ul>
            ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
          </ul>
          <h4>Instructions:</h4>
          <ol>
            ${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}
          </ol>
          ${recipe.notes ? `<p class="recipe-notes"><strong>Notes:</strong> ${recipe.notes}</p>` : ""}
        </div>
      </div>
    </div>
  `;
}

function loadFeaturedRecipes() {
  const featuredGrid = document.getElementById("featured-grid");
  if (!featuredGrid) return;

  const allRecipes = getAllRecipes();
  const recentRecipes = allRecipes.slice(-3).reverse();

  featuredGrid.innerHTML = recentRecipes
    .map((recipe) => createRecipeCard(recipe))
    .join("");
}

function loadAllRecipes() {
  const recipeContainer = document.getElementById("recipe-container");
  const resultsCount = document.getElementById("results-count");

  if (!recipeContainer) return;

  const allRecipes = getAllRecipes();

  recipeContainer.innerHTML = allRecipes
    .map((recipe) => createRecipeCard(recipe))
    .join("");

  if (resultsCount) {
    resultsCount.textContent = `${allRecipes.length} recipe${allRecipes.length !== 1 ? "s" : ""} total`;
  }
}

function toggleRecipeDetails(recipeId) {
  const detailsElement = document.getElementById(`details-${recipeId}`);
  if (detailsElement) {
    if (detailsElement.style.display === "none") {
      detailsElement.style.display = "block";
    } else {
      detailsElement.style.display = "none";
    }
  }
}

function initializePage() {
  updateYear();

  const path = window.location.pathname;

  if (
    path.endsWith("index.html") ||
    path.endsWith("/") ||
    path.endsWith("project")
  ) {
    loadFeaturedRecipes();
  } else if (path.includes("recipes.html")) {
    loadAllRecipes();
  }

  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    const year = new Date().getFullYear();
    yearElement.innerHTML = `&copy; ${year} Isaac Endicott - Utah/Taiwan`;
  }
  const lastEditedElement = document.getElementById("last-edited");
  if (lastEditedElement) {
    lastEditedElement.textContent = `Last Modification: ${document.lastModified}`;
  }
  initializePage();
});
