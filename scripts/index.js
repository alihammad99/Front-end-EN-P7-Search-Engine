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

const ingredientsData = () =>
  recipesData.forEach((recipe) => {
    recipe.ingredients.forEach((data) => {
      if (
        !ingredients.includes(data.ingredient) &&
        !filter.ingredients.includes(data.ingredient)
      ) {
        return ingredients.push(data.ingredient);
      }
    });
  });

const devicseData = () =>
  recipesData.forEach((recipe) => {
    if (
      !devices.includes(recipe.appliance) &&
      filter.devices !== recipe.appliance
    ) {
      devices.push(recipe.appliance);
    }
  });

const ustensilsData = () =>
  recipesData.forEach((recipe) => {
    recipe.ustensils.forEach((data) => {
      if (!ustensils.includes(data) && !filter.ustensils.includes(data)) {
        return ustensils.push(data);
      }
    });
  });

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
