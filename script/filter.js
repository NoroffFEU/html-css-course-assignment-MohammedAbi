import { renderFilteredProducts } from "./productRenderer.js";

function renderGenderFilter(products) {
  try {
    const productContainer = document.getElementById("productContainer");
    if (!productContainer) {
      throw new Error("Product container not found in HTML.");
    }

    const filterContainer = document.getElementById("filterContainer");
    if (filterContainer) {
      // If filter container already exists, remove it before re-rendering
      filterContainer.remove();
    }

    const newFilterContainer = document.createElement("div");
    newFilterContainer.id = "filterContainer";

    // Add heading for gender
    const genderHeading = document.createElement("h4");
    genderHeading.textContent = "Select gender";
    newFilterContainer.appendChild(genderHeading);

    const genderLabels = ["All", "Female", "Male"];

    genderLabels.forEach((label) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "gender";
      radioInput.value = label.toLowerCase();
      radioInput.id = `${label.toLowerCase()}Radio`;
      radioInput.addEventListener("change", (event) =>
        filterProducts(products, event)
      ); // Add event listener and pass event

      const radioLabel = document.createElement("label");
      radioLabel.textContent = label;
      radioLabel.htmlFor = `${label.toLowerCase()}Radio`;

      if (label === "All") {
        // Make "All" option checked by default
        radioInput.checked = true;
      }

      newFilterContainer.appendChild(radioInput);
      newFilterContainer.appendChild(radioLabel);
    });

    productContainer.parentNode.insertBefore(
      newFilterContainer,
      productContainer
    );
  } catch (error) {
    console.error("Error rendering gender filter:", error);
  }
}

function filterProducts(products, event) {
  const selectedGender = event.target.value;
  const filteredProducts = [];

  if (selectedGender === "all") {
    // If "All" is selected, add all products to the filtered list
    filteredProducts.push(...products);
  } else {
    // If a specific gender is selected, filter products based on the gender
    filteredProducts.push(
      ...products.filter(
        (product) => product.gender.toLowerCase() === selectedGender
      )
    );
  }

  // Render the filtered products
  renderFilteredProducts(filteredProducts);
}

export { renderGenderFilter, filterProducts };
