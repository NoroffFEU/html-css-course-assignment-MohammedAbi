// // Utility function to show loading spinner or any UI indicator
// const showLoader = () => {
//   const loaderElement = document.getElementById("loader");
//   if (loaderElement) {
//     loaderElement.style.display = "block";
//   }
// };

// // Utility function to hide loading spinner or any UI indicator
// const hideLoader = () => {
//   const loaderElement = document.getElementById("loader");
//   if (loaderElement) {
//     loaderElement.style.display = "none";
//   }
// };

// // Function to fetch product details by ID
// const getProductById = async (productId) => {
//   try {
//     // Show loader while waiting for the response
//     showLoader();
//     const response = await fetch(
//       `https://v2.api.noroff.dev/rainy-days/${productId}`
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       return responseData.data; // Access the nested product data
//     } else {
//       throw new Error(
//         `Failed to fetch product with status: ${response.status}`
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching product details:", error.message);
//     throw error;
//   } finally {
//     // Hide loader regardless of success or failure
//     hideLoader();
//   }
// };

// // Function to update UI with specific product details
// const updateProductDetails = async (productId) => {
//   const collectionItemsContainer = document.querySelector(".collectionItems");

//   try {
//     // Fetch product data based on the product ID from the URL
//     const product = await getProductById(productId);
//     console.log("Product Details:", product);

//     // Check if the product is defined and has the necessary properties
//     if (
//       product &&
//       product.id &&
//       product.title &&
//       product.description &&
//       product.price &&
//       product.sizes
//     ) {
//       // Update the specific product details
//       const boxElement = collectionItemsContainer.querySelector(".box");
//       boxElement.querySelector("img").src =
//         product.image && product.image.url
//           ? product.image.url
//           : "placeholder-image-url.jpg";
//       boxElement.querySelector("img").alt = product.title;
//       boxElement.querySelector("h4").textContent = product.title;
//       boxElement.querySelector("h5").textContent = `$${product.price.toFixed(
//         2
//       )}`;

//       // Include an element to hold the product ID (hidden)
//       const productIdElement = document.getElementById("productId");
//       if (productIdElement) {
//         productIdElement.textContent = productId;
//       }

//       // Create a new productDescription div with the product's description
//       const productDescriptionElement = boxElement.querySelector(
//         ".productDescription"
//       );
//       if (productDescriptionElement) {
//         productDescriptionElement.innerHTML = `<p>${product.description}</p>`;
//       }

//       // Update the size and color options in the form
//       const sizeSelect = boxElement.querySelector("#size");
//       const colorSelect = boxElement.querySelector("#color");

//       // Clear existing options
//       sizeSelect.innerHTML = '<option value="">Size</option>';
//       colorSelect.innerHTML = '<option value="">Color</option>';

//       // Add new options based on the product details
//       product.sizes.forEach((size) => {
//         const option = document.createElement("option");
//         option.value = size;
//         option.textContent = size;
//         sizeSelect.appendChild(option);
//       });

//       // Add color options based on the product details
//       const option = document.createElement("option");
//       option.value = product.baseColor;
//       option.textContent = product.baseColor;
//       colorSelect.appendChild(option);

//       // Enable/disable the Add to Cart button based on selection
//       handleAddToCartButtonState();
//     } else {
//       console.error("Invalid product data received:", product);
//     }
//   } catch (error) {
//     console.error("Error updating product details:", error.message);
//   }
// };

// // Function to handle enabling/disabling the Add to Cart button based on selected options
// const handleAddToCartButtonState = () => {
//   const sizeSelect = document.getElementById("size");
//   const colorSelect = document.getElementById("color");
//   const quantityInput = document.getElementById("qnty");
//   const addToCartButton = document.getElementById("addToCartButton");

//   // Check if size, color, and quantity are selected
//   const sizeSelected = sizeSelect.value.trim() !== "";
//   const colorSelected = colorSelect.value.trim() !== "";
//   const quantitySelected = parseInt(quantityInput.value) > 0;

//   // Enable/disable the Add to Cart button based on selection
//   addToCartButton.disabled = !(sizeSelected && colorSelected && quantitySelected);
// };

// // Event listeners to track changes in size, color, and quantity select elements
// document.getElementById("size").addEventListener("change", handleAddToCartButtonState);
// document.getElementById("color").addEventListener("change", handleAddToCartButtonState);
// document.getElementById("qnty").addEventListener("input", handleAddToCartButtonState);

// // Function to add an item to the cart and update local storage
// const addItemToCartAndUpdateStorage = (
//   productId,
//   productName,
//   productPrice,
//   productSize,
//   productColor,
//   productQuantity,
//   productImage,
//   productDescription, // Add product description parameter
//   productBaseColor // Add product baseColor parameter
// ) => {
//   try {
//     // Create the cart item object
//     const cartItem = {
//       id: productId,
//       name: productName,
//       price: productPrice,
//       size: productSize,
//       color: productColor,
//       quantity: productQuantity,
//       image: productImage,
//       description: productDescription, // Add product description to the cart item
//       baseColor: productBaseColor // Add product baseColor to the cart item
//     };

//     // Get the cart from localStorage or initialize an empty cart if it doesn't exist
//     let cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];

//     // Check if the item already exists in the cart
//     const existingItemIndex = cartContent.findIndex(
//       (item) => item.id === productId
//     );

//     if (existingItemIndex !== -1) {
//       // If the item already exists, replace it with the new item
//       cartContent[existingItemIndex] = cartItem;
//     } else {
//       // If the item doesn't exist, add it to the cart
//       cartContent.push(cartItem);
//     }

//     // Save the updated cart content back to localStorage
//     localStorage.setItem("cartContent", JSON.stringify(cartContent));

//     // Log the item added to the cart
//     console.log("Item added to cart:", cartItem);

//     // Dispatch a custom event to notify cartInfo.js that the cart has been updated
//     const cartUpdatedEvent = new CustomEvent("cartUpdated");
//     window.dispatchEvent(cartUpdatedEvent);

//     // Show a success message
//     alert("Product added to cart successfully!");
//   } catch (error) {
//     console.error("Error adding item to cart:", error.message);
//   }
// };


// // Function to handle adding the selected product to the cart
// const handleAddToCart = () => {
//   const productId = document.getElementById("productId").textContent.trim();
//   const productName = document.querySelector(".box h4").textContent.trim();
//   const productPrice = parseFloat(
//     document.querySelector(".box h5").textContent.replace("$", "")
//   );
//   const productSize = document.getElementById("size").value.trim();
//   const productColor = document.getElementById("color").value.trim();
//   const productQuantity = parseInt(document.getElementById("qnty").value);
//   const productImage = document.querySelector(".box img").src; // Get product image URL
//   const productDescription = document.querySelector(".productDescription p").textContent.trim(); // Get product description
//   const productBaseColor = productColor; // For now, let's assume base color is the same as product color

//   if (!isNaN(productQuantity) && productQuantity > 0) {
//     addItemToCartAndUpdateStorage(
//       productId,
//       productName,
//       productPrice,
//       productSize,
//       productColor,
//       productQuantity,
//       productImage,
//       productDescription,
//       productBaseColor // Pass product description and base color
//     );
//   } else {
//     alert("Please select a valid quantity.");
//   }
// };

// // Function to initialize the product specific page
// const initProductSpecificPage = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = urlParams.get("id");

//   if (productId) {
//     updateProductDetails(productId);
//   } else {
//     console.error("Product ID not found in URL.");
//   }
// };

// // Event listener to trigger adding the selected product to the cart
// const addToCartButton = document.getElementById("addToCartButton");
// if (addToCartButton) {
//   addToCartButton.addEventListener("click", handleAddToCart);
// }

// // Initialize the product specific page when the DOM content is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   initProductSpecificPage();
//   handleAddToCartButtonState(); // Check initial state of Add to Cart button
// });


// -------------test


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
      product.price &&
      product.sizes
    ) {
      // Update the specific product details
      const boxElement = collectionItemsContainer.querySelector(".box");
      boxElement.querySelector("img").src =
        product.image && product.image.url
          ? product.image.url
          : "placeholder-image-url.jpg";
      boxElement.querySelector("img").alt = product.title;
      boxElement.querySelector("h4").textContent = product.title;
      boxElement.querySelector("h5").textContent = `$${product.price.toFixed(
        2
      )}`;

      // Include an element to hold the product ID (hidden)
      const productIdElement = document.getElementById("productId");
      if (productIdElement) {
        productIdElement.textContent = productId;
      }

      // Create a new productDescription div with the product's description
      const productDescriptionElement = boxElement.querySelector(
        ".productDescription"
      );
      if (productDescriptionElement) {
        productDescriptionElement.innerHTML = `<p>${product.description}</p>`;
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

      // Enable/disable the Add to Cart button based on selection
      handleAddToCartButtonState();
    } else {
      console.error("Invalid product data received:", product);
    }
  } catch (error) {
    console.error("Error updating product details:", error.message);
  }
};

// Function to handle enabling/disabling the Add to Cart button based on selected options
const handleAddToCartButtonState = () => {
  const sizeSelect = document.getElementById("size");
  const colorSelect = document.getElementById("color");
  const quantityInput = document.getElementById("qnty");
  const addToCartButton = document.getElementById("addToCartButton");

  // Check if size, color, and quantity are selected
  const sizeSelected = sizeSelect.value.trim() !== "";
  const colorSelected = colorSelect.value.trim() !== "";
  const quantitySelected = parseInt(quantityInput.value) > 0;

  // Enable/disable the Add to Cart button based on selection
  addToCartButton.disabled = !(sizeSelected && colorSelected && quantitySelected);
};

// Event listeners to track changes in size, color, and quantity select elements
document.getElementById("size").addEventListener("change", handleAddToCartButtonState);
document.getElementById("color").addEventListener("change", handleAddToCartButtonState);
document.getElementById("qnty").addEventListener("input", handleAddToCartButtonState);

// Function to add an item to the cart and update local storage
const addItemToCartAndUpdateStorage = (
  productId,
  productName,
  productPrice,
  productSize,
  productColor,
  productQuantity,
  productImage,
  productDescription, // Add product description parameter
  productBaseColor // Add product baseColor parameter
) => {
  try {
    // Create the cart item object
    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      size: productSize,
      color: productColor,
      quantity: productQuantity,
      image: productImage,
      description: productDescription, // Add product description to the cart item
      baseColor: productBaseColor // Add product baseColor to the cart item
    };

    // Get the cart from localStorage or initialize an empty cart if it doesn't exist
    let cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cartContent.findIndex(
      (item) => item.id === productId
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, replace it with the new item
      cartContent[existingItemIndex] = cartItem;
    } else {
      // If the item doesn't exist, add it to the cart
      cartContent.push(cartItem);
    }

    // Save the updated cart content back to localStorage
    localStorage.setItem("cartContent", JSON.stringify(cartContent));

    // Log the item added to the cart
    console.log("Item added to cart:", cartItem);

    // Dispatch a custom event to notify cartInfo.js that the cart has been updated
    const cartUpdatedEvent = new CustomEvent("cartUpdated");
    window.dispatchEvent(cartUpdatedEvent);

    // Show a success message
    alert("Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
  }
};


// Function to handle adding the selected product to the cart
const handleAddToCart = () => {
  const productId = document.getElementById("productId").textContent.trim();
  const productName = document.querySelector(".box h4").textContent.trim();
  const productPrice = parseFloat(
    document.querySelector(".box h5").textContent.replace("$", "")
  );
  const productSize = document.getElementById("size").value.trim();
  const productColor = document.getElementById("color").value.trim();
  const productQuantity = parseInt(document.getElementById("qnty").value);
  const productImage = document.querySelector(".box img").src; // Get product image URL
  const productDescription = document.querySelector(".productDescription p").textContent.trim(); // Get product description
  const productBaseColor = productColor; // For now, let's assume base color is the same as product color

  if (!isNaN(productQuantity) && productQuantity > 0) {
    addItemToCartAndUpdateStorage(
      productId,
      productName,
      productPrice,
      productSize,
      productColor,
      productQuantity,
      productImage,
      productDescription,
      productBaseColor // Pass product description and base color
    );
  } else {
    alert("Please select a valid quantity.");
  }
};

// Function to initialize the product specific page
const initProductSpecificPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    updateProductDetails(productId);
  } else {
    console.error("Product ID not found in URL.");
  }
};

// Event listener to trigger adding the selected product to the cart
const addToCartButton = document.getElementById("addToCartButton");
if (addToCartButton) {
  addToCartButton.addEventListener("click", handleAddToCart);
}

// Initialize the product specific page when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  initProductSpecificPage();
  handleAddToCartButtonState(); // Check initial state of Add to Cart button
});