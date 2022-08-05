
const inputs = {
  ingredientsInput: document.getElementById("filter-input-ingredients"),
  devicesInput: document.getElementById("filter-input-devices"),
  ustensilsInput: document.getElementById("filter-input-ustensils"),
};

const handleInputFocus = (name, element) => {
  element.value = "";
  element.placeholder = `Search in ${name.toLowerCase()}`;
};

const handleInputBlur = (name, element) => {
  element.value = name;
};

const handleEvents = () => {
  inputs.ingredientsInput.addEventListener("focus", () =>
    handleInputFocus("Ingredients", inputs.ingredientsInput)
  );
  inputs.ingredientsInput.addEventListener("blur", () =>
    handleInputBlur("Ingredients", inputs.ingredientsInput)
  );

  inputs.devicesInput.addEventListener("focus", () =>
    handleInputFocus("Devices", inputs.devicesInput)
  );
  inputs.devicesInput.addEventListener("blur", () =>
    handleInputBlur("Devices", inputs.devicesInput)
  );

  inputs.ustensilsInput.addEventListener("focus", () =>
    handleInputFocus("Ustensils", inputs.ustensilsInput)
  );
  inputs.ustensilsInput.addEventListener("blur", () =>
    handleInputBlur("Ustensils", inputs.ustensilsInput)
  );
};

handleEvents();
