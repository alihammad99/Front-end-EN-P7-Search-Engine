import {
  handleDeleteFilter,
  handleSearch,
  updateFilteredData,
} from "./index.js";

const box = document.getElementById("section-filters-active");
const searchInput = document.getElementById("search");

const showFilters = (value, type) => {
  if (typeof value == "string") {
    if (value.length < 2) {
      return;
    }
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-success", "mx-2");
    btn.textContent = value;
    btn.insertAdjacentHTML(
      "beforeend",
      `<i class="bi bi-x-circle ms-2 pe-none"></i>`
    );
    btn.addEventListener("click", (e) => {
      handleDeleteFilter(e, "filter-btn-devices");
      updateFilteredData();
      handleSearch();
    });
    box.appendChild(btn);
  } else if (value == null) {
    return;
  } else {
    value.map((item) => {
      const btn = document.createElement("button");
      btn.id =
        type == "ingredients"
          ? "filter-btn-ingredients"
          : "filter-btn-ustensils";
      btn.classList.add("btn", "mx-2");
      btn.classList.add(type == "ingredients" ? "btn-primary" : "btn-danger");
      btn.textContent = item;
      btn.insertAdjacentHTML(
        "beforeend",
        `<i class="bi bi-x-circle ms-2 pe-none"></i>`
      );

      btn.addEventListener("click", (e) => {
        handleDeleteFilter(
          e,
          type == "ingredients"
            ? "filter-btn-ingredients"
            : "filter-btn-ustensils"
        );
        updateFilteredData();
        handleSearch();
      });

      box.appendChild(btn);
    });
  }
};

export default showFilters;
