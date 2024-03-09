import { showLoader, hideLoader } from "./ui.js";

// Function to retrieve all products
export const getAllProducts = async (url) => {
  try {
    // Show loader while waiting for the response
    showLoader();
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      console.log("Product Data:", responseData);

      const products = responseData.data;

      if (products.length > 0) {
        console.log("All Product Data:", products);
        updateProductBoxes(products);
      }
    } else {
      throw new Error(
        "Failed to retrieve products with status: " + response.status
      );
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    // Hide loader regardless of success or failure
    hideLoader();
  }
};

// Function to dynamically update product information
export const updateProductBoxes = (products) => {
  const productContainer = document.getElementById("productContainer");

  // Clear existing content in the container
  productContainer.innerHTML = "";

  // Iterate through each product and create a product box
  products.forEach((product) => {
    const productBox = document.createElement("div");
    productBox.classList.add("box");

    productBox.innerHTML = `
          <a href="/index/productSpecificPage.html">
            <img src="${product.image.url}" alt="${
      product.description
    }" id="productImage" />
          </a>
          <h4 id="productName">${product.title}</h4>
          <h5 id="productPrice">$${product.price.toFixed(2)}</h5>
          <div class="cart">
            <i class="bx bx-shopping-bag" id="bx-shopping-bag"></i>
          </div>
        `;

    // Append the product box to the container
    productContainer.appendChild(productBox);
  });
};
