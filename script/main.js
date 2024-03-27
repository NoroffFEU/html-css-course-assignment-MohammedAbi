import { loginUser } from "../script/user.js";
import { renderGenderFilter, filterProducts } from "./filter.js";
import { renderFilteredProducts } from "./productRenderer.js";
import { showLoader, hideLoader } from "./loader.js";

let products = [];
let clickedProduct = null;

async function renderProducts() {
  try {
    // Show loader while fetching products
    showLoader();

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
    renderGenderFilter(products); // Call the gender filter rendering function here
    renderFilteredProducts(products); // Render all products initially

    // Hide loader after products are rendered
    hideLoader();
  } catch (error) {
    console.error("Error rendering products:", error);
    // Hide loader in case of error
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

export { products, renderProducts, clickedProduct };
