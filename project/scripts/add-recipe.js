// js for our add-recipe.html page
// gets form data, validates, and saves it to localStorage to display on recipes html page
let ingredientCount = 1;
let instructionCount = 1;

function addIngredient() {
  const container = document.getElementById("ingredients-list");
  const newItem = document.createElement("div");
  newItem.className = "list-item";
  newItem.innerHTML = `
    <input 
      type="text" 
      name="ingredient-${ingredientCount}"
      placeholder="e.g., 1 tsp vanilla extract"
      class="form-control ingredient-input"
      required
    />
  `;
  container.appendChild(newItem);
  ingredientCount++;
}

function addInstruction() {
  const container = document.getElementById("instructions-list");
  const newItem = document.createElement("div");
  newItem.className = "list-item";
  newItem.innerHTML = `
    <textarea 
      name="instruction-${instructionCount}" 
      rows="2"
      placeholder="Describe this step..."
      class="form-control instruction-input"
      required
    ></textarea>
  `;
  container.appendChild(newItem);
  instructionCount++;
}

function getFormData() {
  const form = document.getElementById("recipe-form");
  const formData = new FormData(form);

  const recipe = {
    name: formData.get("recipeName"),
    category: formData.get("category"),
    difficulty: formData.get("difficulty"),
    prepTime: formData.get("prepTime")
      ? parseInt(formData.get("prepTime"))
      : null,
    cookTime: formData.get("cookTime")
      ? parseInt(formData.get("cookTime"))
      : null,
    servings: formData.get("servings")
      ? parseInt(formData.get("servings"))
      : null,
    description: formData.get("description"),
    notes: formData.get("notes"),
    image: formData.get("imageUrl") || "images/default-recipe.jpg",
  };

  const ingredients = [];
  const ingredientInputs = document.querySelectorAll(".ingredient-input");
  ingredientInputs.forEach((input) => {
    if (input.value.trim()) {
      ingredients.push(input.value.trim());
    }
  });
  recipe.ingredients = ingredients;

  const instructions = [];
  const instructionInputs = document.querySelectorAll(".instruction-input");
  instructionInputs.forEach((input) => {
    if (input.value.trim()) {
      instructions.push(input.value.trim());
    }
  });
  recipe.instructions = instructions;

  return recipe;
}

function saveRecipe(recipeData) {
  const userRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];

  const newRecipe = {
    id: Date.now(),
    ...recipeData,
  };

  userRecipes.push(newRecipe);

  localStorage.setItem("userRecipes", JSON.stringify(userRecipes));

  return true;
}

function showMessage(text, type) {
  const messageEl = document.getElementById("form-message");
  if (messageEl) {
    messageEl.textContent = text;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = "block";
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const recipeName = document.getElementById("recipe-name").value.trim();
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const imageUrl = document.getElementById("image-url").value.trim();

  if (!recipeName) {
    showMessage("Recipe name is required.", "error");
    return;
  }

  if (!category) {
    showMessage("Please select a category.", "error");
    return;
  }

  if (!difficulty) {
    showMessage("Please select a difficulty level.", "error");
    return;
  }

  if (!imageUrl) {
    showMessage("Picture URL is required.", "error");
    return;
  }

  const ingredientInputs = document.querySelectorAll(".ingredient-input");
  let hasIngredients = false;
  ingredientInputs.forEach((input) => {
    if (input.value.trim()) hasIngredients = true;
  });

  if (!hasIngredients) {
    showMessage("At least one ingredient is required.", "error");
    return;
  }

  const instructionInputs = document.querySelectorAll(".instruction-input");
  let hasInstructions = false;
  instructionInputs.forEach((input) => {
    if (input.value.trim()) hasInstructions = true;
  });

  if (!hasInstructions) {
    showMessage("At least one instruction is required.", "error");
    return;
  }

  const recipeData = getFormData();

  if (saveRecipe(recipeData)) {
    showMessage("Recipe saved successfully!", "success");
    setTimeout(() => {
      window.location.href = "recipes.html";
    }, 2000);
  } else {
    showMessage("Error saving recipe. Please try again.", "error");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const addIngredientBtn = document.getElementById("add-ingredient");
  const addInstructionBtn = document.getElementById("add-instruction");
  const form = document.getElementById("recipe-form");

  if (addIngredientBtn) {
    addIngredientBtn.addEventListener("click", addIngredient);
  }

  if (addInstructionBtn) {
    addInstructionBtn.addEventListener("click", addInstruction);
  }

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});
