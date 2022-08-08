import { addToFiltersList, handleSearch, updateFilteredData } from "./index.js";

const ingredients = document.getElementById("filters-options-ingredients");
const devices = document.getElementById("filters-options-devices");
const ustensils = document.getElementById("filters-options-ustensils");
const inputs = {
  ingredients: document.getElementById("filter-input-ingredients"),
  devices: document.getElementById("filter-input-devices"),
  ustensils: document.getElementById("filter-input-ustensils"),
};
const searchInput = document.getElementById("search");

const handleAddingFilters = (arr, type) => {
  let filters = arr.sort();

  if (arr.length > 30) {
    addFilters(filters, type, 1, 11);
    addFilters(filters, type, 11, 21);
    addFilters(filters, type, 21, 31);
  } else {
    const length = filters.length / 3;
    addFilters(filters, type, 0, length);
    addFilters(filters, type, length, length * 2);
    addFilters(filters, type, length * 2, length * 3);
  }
};

const addFilters = (arr, type, from, to) => {
  const { box } = addColumn();
  const filters = [...arr].slice(from, to);
  filters.forEach((filter) => {
    const { item } = addItems(filter, type);
    box.appendChild(item);
  });

  switch (type) {
    case "ingredients":
      ingredients.appendChild(box);
      break;

    case "devices":
      devices.appendChild(box);
      break;

    case "ustensils":
      ustensils.appendChild(box);
      break;
  }
};

export const addToList = () => {
  const ingredientseValue = inputs.ingredients.value;
  console.log(ingredientseValue);
};

const addColumn = () => {
  const box = document.createElement("div");
  box.className = "col";
  return { box };
};

const addItems = (content, type) => {
  const item = document.createElement("li");
  item.classList.add("dropdown-item", "text-white");
  item.textContent = content;

  switch (type) {
    case "ingredients":
      item.className += " filters-option-item-ingredients filter-item-primary fs-5";
      item.addEventListener("click", (e) => {
        addToFiltersList("ingredients", e);
        updateFilteredData();
        handleSearch();
      });
      break;

    case "devices":
      item.className += " filters-option-item-devices filter-item-success fs-5";

      item.addEventListener("click", (e) => {
        addToFiltersList("devices", e);
        updateFilteredData();
        handleSearch()
      });
      break;

    case "ustensils":
      item.className += " filters-option-item-ustensils filter-item-danger fs-5";
      item.addEventListener("click", (e) => {
        addToFiltersList("ustensils", e);
        updateFilteredData();
        handleSearch()
      });
      break;
  }

  return { item };
};

export const handleUpdateInput = (arr, type) => {
  filterFiltersOptionsInputs(arr, type);
};

const filterFiltersOptionsInputs = (arr, type) => {
  let targetElement;
  let targetElementBox;

  switch (type) {
    case "ingredients":
      targetElement = inputs.ingredients;
      targetElementBox = ingredients;
      break;

    case "devices":
      targetElement = inputs.devices;
      targetElementBox = devices;
      break;

    case "ustensils":
      targetElement = inputs.ustensils;
      targetElementBox = ustensils;
      break;
  }

  targetElement.addEventListener("input", (e) => {
    if (targetElement.value.length >= 0 && targetElement.value.length < 2) {
      targetElementBox.innerHTML = "";
      return handleAddingFilters(arr, type);
    } else {
      targetElementBox.innerHTML = "";
      const filtered = arr.filter((value) =>
        value.toLowerCase().includes(e.target.value)
      );
      return handleAddingFilters(filtered, type);
    }
  });
};

export default handleAddingFilters;
