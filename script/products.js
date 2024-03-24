import { loginUser } from "../script/user.js";

let products = [];
let clickedProduct = null;

async function renderProducts() {
  try {
    const token = await loginUser(
      "https://v2.api.noroff.dev/auth/login",
      "mohammed.abi@stud.noroff.no",
      "Skuraane2024"
    );

    const response = await fetch("https://v2.api.noroff.dev/rainy-days", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Failed to fetch products with status: " + response.status
      );
    }

    const { data } = await response.json();
    products = data;
    renderGenderFilter(); // Call the gender filter rendering function here
    renderFilteredProducts(products); // Render all products initially
  } catch (error) {
    console.error("Error rendering products:", error);
  }
}

function renderGenderFilter() {
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
      radioInput.addEventListener("change", filterProducts); // Add event listener

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

function filterProducts(event) {
  const selectedGender = event.target.value;
  const filteredProducts = [];

  if (selectedGender === "all") {
    // If "All" is selected, add all products to the filtered list
    filteredProducts.push(...products);
  } else {
    // If a specific gender is selected, filter products based on the gender
    filteredProducts.push(...products.filter(product => product.gender.toLowerCase() === selectedGender));
  }

  // Render the filtered products
  renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(filteredProducts) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  filteredProducts.forEach((product) => {
    // Render product as before
    const { id, title, description, image, sizes, price, gender } = product;

    const box = document.createElement("div");
    box.classList.add("box");

    box.dataset.productId = id;

    const productLink = document.createElement("a");
    productLink.href = `/index/productSpecificPage.html?id=${id}`;

    const productImage = document.createElement("img");
    productImage.src = image.url;
    productImage.alt = image.alt || "Product Image";

    const productName = document.createElement("h4");
    productName.textContent = title;

    const productDescription = document.createElement("p");
    productDescription.textContent = description;

    const productPrice = document.createElement("h5");
    productPrice.textContent = `$${price}`;

    const productGender = document.createElement("p");
    productGender.textContent = gender;

    const productSizes = document.createElement("p");
    productSizes.textContent = "Sizes: " + sizes.join(", ");

    const cartIcon = document.createElement("div");
    cartIcon.classList.add("cart");
    const shoppingBagIcon = document.createElement("i");
    shoppingBagIcon.classList.add("bx", "bx-shopping-bag");
    cartIcon.appendChild(shoppingBagIcon);

    productLink.appendChild(productImage);
    box.appendChild(productLink);
    box.appendChild(productName);
    box.appendChild(productDescription);
    box.appendChild(productPrice);
    box.appendChild(productGender);
    box.appendChild(productSizes);
    box.appendChild(cartIcon);

    productContainer.appendChild(box);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

export { products, renderProducts, clickedProduct };
