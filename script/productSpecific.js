// Utility function to show loading spinner or any UI indicator
const showLoader = () => {
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    loaderElement.style.display = "block";
  }
};

// Utility function to hide loading spinner or any UI indicator
const hideLoader = () => {
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    loaderElement.style.display = "none";
  }
};
// -----------------------------------------------------------------

// Function to fetch product details by ID
const getProductById = async (productId) => {
  try {
    // Show loader while waiting for the response
    showLoader();
    const response = await fetch(
      `https://v2.api.noroff.dev/rainy-days/${productId}`
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data; // Access the nested product data
    } else {
      throw new Error(
        `Failed to fetch product with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  } finally {
    // Hide loader regardless of success or failure
    hideLoader();
  }
};

// Function to update UI with specific product details
const updateProductDetails = async (productId) => {
  const collectionItemsContainer = document.querySelector(".collectionItems");

  try {
    // Fetch product data based on the product ID from the URL
    const product = await getProductById(productId);
    console.log("Product Details:", product);

    // Check if the product is defined and has the necessary properties
    if (
      product &&
      product.id &&
      product.title &&
      product.description &&
      product.gender &&
      product.sizes &&
      product.baseColor &&
      product.price &&
      product.gender &&
      //   product.onSale &&
      product.image &&
      product.image.url &&
      product.discountedPrice &&
      product
    ) {
      // Update the specific product details
      const boxElement = collectionItemsContainer.querySelector(".box");
      boxElement.querySelector("img").src = product.image.url;
      boxElement.querySelector("img").alt = product.description;
      boxElement.querySelector("h4").textContent = product.title;
      boxElement.querySelector("h5").textContent = `$${product.price.toFixed(
        2
      )}`;
      // Create a new productDescription div with the product's description
      const newProductDescription = document.createElement("div");
      newProductDescription.classList.add("productDescription");
      newProductDescription.innerHTML = `<p>${product.description}</p>`;

      // Replace the existing productDescription div with the new one
      const existingProductDescription = boxElement.querySelector(
        ".productDescription"
      );
      if (existingProductDescription) {
        existingProductDescription.replaceWith(newProductDescription);
      }

      // Update the size and color options in the form
      const sizeSelect = boxElement.querySelector("#size");
      const colorSelect = boxElement.querySelector("#color");

      // Clear existing options
      sizeSelect.innerHTML = '<option value="">Size</option>';
      colorSelect.innerHTML = '<option value="">Color</option>';

      // Add new options based on the product details
      product.sizes.forEach((size) => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
      });

      // Add color options based on the product details
      const option = document.createElement("option");
      option.value = product.baseColor;
      option.textContent = product.baseColor;
      colorSelect.appendChild(option);

      // Additional code to update other elements in the collection
      // ... Add your code here to update other elements if needed
    } else {
      console.error("Invalid product data received:", product);
    }
  } catch (error) {
    console.error("Error updating product details:", error.message);
  }
};
// Function to handle add to cart button click
const handleAddToCart = () => {
  // Add your logic here to handle adding the product to the cart
};


// Extract product ID from the query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Check if the product ID is available and call the function to retrieve details
if (productId) {
  updateProductDetails(productId);
} else {
  console.error("Product ID not found in the query string.");
}
