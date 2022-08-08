export const Cards = (recipes) => {
  document.getElementById("cards").innerHTML = "";
  recipes.map((recipe) => {
    const { title, ingredients, time, description } = createElements();
    addElements(title, ingredients, time, description, recipe);
  });
};

const addElements = (title, ingredients, time, description, recipe) => {
  title.textContent = recipe.name;
  recipe.ingredients.forEach((item) => {
    const { ingredientItem } = IngredientItems(ingredients);
    ingredientItem.innerHTML = `<strong>${item.ingredient}:</strong> ${
      item.quantity ? item.quantity : "-"
    } ${item.unit ? item.unit : ""}`;
  });
  time.innerHTML = `<i class="bi bi-clock fw-bold"></i> ${recipe.time} min`;
  description.textContent = recipe.description;
};

const IngredientItems = (box) => {
  const ingredientItem = document.createElement("p");
  ingredientItem.classList.add("d-block", "my-1");
  box.appendChild(ingredientItem);

  return {
    ingredientItem,
  };
};

const createElements = () => {
  const cardSection = document.getElementById("cards");
  const box = document.createElement("div");
  box.classList.add("col-12", "col-sm-6", "col-lg-4");
  const cardHolder = document.createElement("div");
  cardHolder.classList.add("col-content", "overflow-hidden");
  const photo = document.createElement("img");
  photo.src = "./assets/card-bg.svg";
  photo.classList.add("card-img-top");
  photo.setAttribute("alt", "Card's Photo");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "row", "bg-light");

  //Left
  const leftBox = document.createElement("div");
  leftBox.classList.add("left", "col");
  const title = document.createElement("h1");
  title.classList.add("card-title", "mb-3", "fs-5");
  const ingredients = document.createElement("div");
  ingredients.classList.add("card-ingredients");

  //Right
  const rightBox = document.createElement("div");
  rightBox.classList.add("right", "col");
  const time = document.createElement("h2");
  time.classList.add("fs-5", "fw-semibold", "mb-3", "text-end");
  const description = document.createElement("div");
  description.classList.add("description", "fs-6", "text-end");

  rightBox.append(time, description);
  leftBox.append(title, ingredients);
  cardBody.append(leftBox, rightBox);
  cardHolder.append(photo, cardBody);
  box.appendChild(cardHolder);
  cardSection.appendChild(box);

  return {
    title,
    ingredients,
    time,
    description,
  };
};
