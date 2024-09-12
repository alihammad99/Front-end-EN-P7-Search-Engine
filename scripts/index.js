import { Cards } from "./cards.js";
import showFilters from "./filterBtns.js";
import handleAddingFilters, { handleUpdateInput } from "./filters.js";
import { recipes } from "./recipes.js";
const ingredientsBox = document.getElementById("filters-options-ingredients");
const devicesBox = document.getElementById("filters-options-devices");
const ustensilsBox = document.getElementById("filters-options-ustensils");
let recipesData = [...recipes];

let ingredients = [];
let devices = [];
let ustensils = [];

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => handleSearch());

const ingredientsData = () => {
  for (let recipe of recipesData) {
    for (let data of recipe.ingredients) {
      if (
        !ingredients.includes(data.ingredient) &&
        !filter.ingredients.includes(data.ingredient)
      ) {
         ingredients.push(data.ingredient);
      }
    }
  }
};

const devicseData = () => {
  for (let recipe of recipesData) {
    if (
      !devices.includes(recipe.appliance) &&
      filter.devices !== recipe.appliance
    ) {
       devices.push(recipe.appliance);
    }
  }
};

const ustensilsData = () => {
  for (let recipe of recipesData) {
    for (let data of recipe.ustensils) {
      if (!ustensils.includes(data) && !filter.ustensils.includes(data)) {
         ustensils.push(data);
      }
    }
  }
};
const updateFilteresItems = () => {
  ingredientsBox.innerHTML = "";
  devicesBox.innerHTML = "";
  ustensilsBox.innerHTML = "";
  ingredients = [];
  devices = [];
  ustensils = [];

  ingredientsData();
  devicseData();
  ustensilsData();
};

let filter = {
  devices: "",
  ustensils: [],
  ingredients: [],
  search: "",
};

export const handleSearch = () => {
  updateFilteredData();

  const value = `${searchInput.value}`;
  const value2 = `${
    searchInput.value.charAt(0).toUpperCase() + value.slice(1)
  }`;
  const result = [];

  if (value.length > 2) {
    for (let recipe of recipesData) {
      const check = () =>
        recipe.ingredients.some((data) => data.ingredient.includes(value));
      if (
        recipe.name.includes(value || value2) ||
        recipe.description.includes(value || value2) ||
        recipe.appliance.includes(value || value2) ||
        recipe.ustensils.forEach((item) => item.includes(value || value2)) ||
        recipe.ingredients.every(check)
      ) {
        if (!result.includes(recipe)) {
           result.push(recipe);
        }
      }
    }
    recipesData = result;
    Cards(recipesData);
  } else {
    updateFilteredData();
  }
};

const handleFiltering = () => {
  recipesData = [...recipes];

  if (filter.ingredients.length > 0) {
    recipesData = recipesData.filter((recipe) => {
      const check = (item) =>
        recipe.ingredients.some((data) => data.ingredient == item);
      return filter.ingredients.every(check);
    });
  }

  if (filter.devices.length > 0) {
    recipesData = recipesData.filter(
      (recipe) => recipe.appliance == filter.devices
    );
  }

  if (filter.ustensils.length > 0) {
    recipesData = recipesData.filter((recipe) => {
      const check = (item) => recipe.ustensils.includes(item);
      return filter.ustensils.every(check);
    });
  }

  return recipesData;
};

export const handleDeleteFilter = (e, id) => {
  switch (id) {
    case "filter-btn-ingredients":
      filter.ingredients = filter.ingredients.filter(
        (data) => data !== e.target.innerText
      );
      break;

    case "filter-btn-devices":
      filter.devices = "";
      break;

    case "filter-btn-ustensils":
      filter.ustensils = filter.ustensils.filter(
        (data) => data !== e.target.innerText
      );
      break;
  }
  document.getElementById("section-filters-active").innerHTML = "";
  showFilters(filter.ingredients, "ingredients");
  showFilters(filter.devices, "devices");
  showFilters(filter.ustensils, "ustensils");
};

export const addToFiltersList = (type, e) => {
  switch (type) {
    case "ingredients":
      filter.ingredients.push(e.target.textContent);
      break;

    case "devices":
      filter.devices = e.target.textContent;
      break;

    case "ustensils":
      filter.ustensils.push(e.target.textContent);
      break;
  }

  const container = document.getElementById("section-filters-active");
  container.innerHTML = "";
  showFilters(filter.ingredients, "ingredients");
  showFilters(filter.devices, "devices");
  showFilters(filter.ustensils, "ustensils");
};

export const updateFilteredData = () => {
  handleFiltering();
  init();
};

const init = () => {
  updateFilteresItems();
  handleAddingFilters(ingredients, "ingredients");
  handleAddingFilters(devices, "devices");
  handleAddingFilters(ustensils, "ustensils");
  handleUpdateInput(ingredients, "ingredients");
  handleUpdateInput(devices, "devices");
  handleUpdateInput(ustensils, "ustensils");
  Cards(recipesData);
};
init();
