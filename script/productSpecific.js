// // Function to retrieve the clicked product ID from the URL parameters
// function getClickedProductId() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   return urlParams.get("id");
// }

// // Function to fetch product details from the server using the product ID
// async function fetchProductDetails(productId) {
//   try {
//     // Fetch product details from the server
//     const response = await fetch(
//       `https://v2.api.noroff.dev/rainy-days/${productId}`
//     );

//     if (response.ok) {
//       // Parse the response JSON
//       const product = await response.json();

//       // Display the fetched product details
//       displayProductDetails(product);
//     } else {
//       throw new Error(
//         "Failed to fetch product details with status: " + response.status
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//   }
<<<<<<< Updated upstream
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
//   productDescription,
//   productBaseColor
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
//       description: productDescription,
//       baseColor: productBaseColor
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

//     // Dispatch a custom event to notify cartInfo.js that the cart has been updated
//     const cartUpdatedEvent = new CustomEvent("cartUpdated");
//     window.dispatchEvent(cartUpdatedEvent);

//     // Update the counter
//     updateCartCounter(cartContent.length);

//     // Show a success message
//     alert("Product added to cart successfully!");
//   } catch (error) {
//     console.error("Error adding item to cart:", error.message);
//   }
// };

// // Function to update the cart counter
// const updateCartCounter = (count) => {
//   const counterSpan = document.querySelector('.icons .counter');
//   if (counterSpan) {
//     counterSpan.textContent = count;
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
=======
>>>>>>> Stashed changes
// }

// // Function to display product details on the page
// function displayProductDetails(product) {
//   // Select the container element to replace with the product details
//   const productContainer = document.querySelector(".collectionItems");

//   // Clear previous content
//   productContainer.innerHTML = "";

//   // Create a new box element for the product details
//   const productBox = document.createElement("div");
//   productBox.classList.add("box");

//   if (
//     product.data &&
//     product.data.image &&
//     product.data.image.url &&
//     product.data.title &&
//     product.data.price &&
//     product.data.description &&
//     product.data.sizes &&
//     product.data.baseColor
//   ) {
//     // Set inner HTML of the new box with the fetched product details
//     productBox.innerHTML = `
//       <img src="${product.data.image.url}" alt="${product.data.title}" />
//       <h4>${product.data.title}</h4>
//       <h5>$${product.data.price}</h5>
//       <div class="productDescription">
//         <p>${product.data.description}</p>
//       </div>
//       <div class="container">
//         <div class="dropdownContainer">
//           <h3>Make Your Selection:</h3>
//           <form id="productForm">
//             <label for="size">Size</label>
//             <select name="size" id="size">
//               <option value="">Size</option>
//               ${product.data.sizes
//                 .map((size) => `<option value="${size}">${size}</option>`)
//                 .join("")}
//             </select>

//             <label for="color">Color</label>
//             <select name="color" id="color">
//               <option value="">Color</option>
//               <option value="${product.data.baseColor}">${
//       product.data.baseColor
//     }</option>
//             </select>

//             <label for="qnty">Quantity</label>
//             <select name="qnty" id="qnty">
//               <option value="">Quantity</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="4">4</option>
//               <option value="7">7</option>
//             </select>
//           </form>
//         </div>
//       </div>
//       <button class="addToCart" id="addToCartButton">Add to Cart <i class="bx bx-shopping-bag"></i></button>
//     `;
//   } else {
//     console.error("Product details are incomplete or undefined:", product);
//   }

//   // Append the new box with product details to the container
//   productContainer.appendChild(productBox);

//   // Add event listener to the "Add to Cart" button
//   const addToCartButton = document.getElementById("addToCartButton");
//   if (addToCartButton) {
//     addToCartButton.addEventListener("click", handleAddToCart);
//   } else {
//     console.error("No 'Add to Cart' button found.");
//   }
// }

// // Function to handle adding a product to the cart
// function handleAddToCart(event) {
//   // Prevent the default behavior of the button
//   event.preventDefault();

//   // Retrieve the selected size, color, and quantity from the form
//   const selectedSize = document.getElementById("size").value;
//   const selectedColor = document.getElementById("color").value;
//   const selectedQuantity = document.getElementById("qnty").value;

//   // Retrieve the product ID from the URL parameters
//   const productId = getClickedProductId();

//   // Fetch the product details from the currently displayed product on the page
//   const productTitle = document.querySelector(".box h4").textContent;
//   const productPrice = document.querySelector(".box h5").textContent;
//   const productDescription = document.querySelector(
//     ".productDescription p"
//   ).textContent;
//   const productImageUrl = document
//     .querySelector(".box img")
//     .getAttribute("src");

//   // Create a new product object
//   const newProduct = {
//     id: productId,
//     size: selectedSize,
//     color: selectedColor,
//     quantity: selectedQuantity,
//     title: productTitle,
//     price: productPrice,
//     description: productDescription,
//     imageUrl: productImageUrl,
//   };

//   // Retrieve the existing products from local storage or initialize an empty array
//   let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

//   // Add the new product to the existing products array
//   productsInCart.push(newProduct);

//   // Save the updated products to local storage
//   localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

//   // Redirect the user to the cart page
//   window.location.href = "/index/cartInfo.html";
// }

// // Function to update the cart count based on the items in the cart
// function updateCartCount() {
//   // Retrieve the products from local storage
//   const productsInCart =
//     JSON.parse(localStorage.getItem("productsInCart")) || [];

//   // Calculate the total quantity of items in the cart
//   const totalQuantity = productsInCart.reduce(
//     (total, product) => total + parseInt(product.quantity),
//     0
//   );

//   // Update the cart count element in the HTML
//   const cartCountElement = document.querySelector(".counter");
//   if (cartCountElement) {
//     cartCountElement.textContent = totalQuantity.toString();
//   } else {
//     console.error("Cart count element not found.");
//   }
// }

// // Call updateCartCount function when the page loads
// document.addEventListener("DOMContentLoaded", updateCartCount);

// // Wait for the DOM content to be fully loaded
// document.addEventListener("DOMContentLoaded", function () {
//   // Retrieve the clicked product ID from the URL parameters
//   const clickedProductId = getClickedProductId();

//   // Fetch and display product details based on the clicked product ID
//   if (clickedProductId) {
//     fetchProductDetails(clickedProductId);
//   } else {
//     console.error("No product ID found in URL parameters.");
//   }
// });
<<<<<<< Updated upstream
// --------test
=======

// ------------Everything works

// Function to retrieve the clicked product ID from the URL parameters
function getClickedProductId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}
>>>>>>> Stashed changes

// Function to fetch product details from the server using the product ID
async function fetchProductDetails(productId) {
  try {
    // Fetch product details from the server
    const response = await fetch(
      `https://v2.api.noroff.dev/rainy-days/${productId}`
    );

    if (response.ok) {
      // Parse the response JSON
      const product = await response.json();

      // Display the fetched product details
      displayProductDetails(product);
    } else {
      throw new Error(
        "Failed to fetch product details with status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
<<<<<<< Updated upstream
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

// Function to update the cart counter
const updateCartCounter = (count) => {
  const counterSpan = document.querySelector('.icons .counter');
  if (counterSpan) {
    counterSpan.textContent = count;
  }
};

// Function to update the total price in cart
const updateTotalPrice = (price) => {
  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.textContent = `$${price.toFixed(2)}`;
  }
};

// Function to add an item to the cart and update local storage
const addItemToCartAndUpdateStorage = (
  productId,
  productName,
  productPrice,
  productSize,
  productColor,
  productQuantity,
  productImage,
  productDescription,
  productBaseColor
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
      description: productDescription,
      baseColor: productBaseColor
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

    // Dispatch a custom event to notify cartInfo.js that the cart has been updated
    const cartUpdatedEvent = new CustomEvent("cartUpdated");
    window.dispatchEvent(cartUpdatedEvent);

    // Update the counter
    updateCartCounter(cartContent.length);

    // Calculate total price
    const totalPrice = cartContent.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update total price
    updateTotalPrice(totalPrice);

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

}

// Function to display product details on the page
function displayProductDetails(product) {
  // Select the container element to replace with the product details
  const productContainer = document.querySelector(".collectionItems");

  // Clear previous content
  productContainer.innerHTML = "";

  // Create a new box element for the product details
  const productBox = document.createElement("div");
  productBox.classList.add("box");

  if (
    product.data &&
    product.data.image &&
    product.data.image.url &&
    product.data.title &&
    product.data.price &&
    product.data.description &&
    product.data.sizes &&
    product.data.baseColor
  ) {
    // Set inner HTML of the new box with the fetched product details
    productBox.innerHTML = `
      <img src="${product.data.image.url}" alt="${product.data.title}" />
      <h4>${product.data.title}</h4>
      <h5>$${product.data.price}</h5>
      <div class="productDescription">
        <p>${product.data.description}</p>
      </div>
      <div class="container">
        <div class="dropdownContainer">
          <h3>Make Your Selection:</h3>
          <form id="productForm">
            <label for="size">Size</label>
            <select name="size" id="size">
              <option value="">Size</option>
              ${product.data.sizes
                .map((size) => `<option value="${size}">${size}</option>`)
                .join("")}
            </select>

            <label for="color">Color</label>
            <select name="color" id="color">
              <option value="">Color</option>
              <option value="${product.data.baseColor}">${
      product.data.baseColor
    }</option>
            </select>

            <label for="qnty">Quantity</label>
            <select name="qnty" id="qnty">
              <option value="">Quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="7">7</option>
            </select>
          </form>
        </div>
      </div>
      <button class="addToCart" id="addToCartButton">Add to Cart <i class="bx bx-shopping-bag"></i></button>
    `;
  } else {
    console.error("Product details are incomplete or undefined:", product);
  }

  // Append the new box with product details to the container
  productContainer.appendChild(productBox);

  // Add event listener to the "Add to Cart" button
  const addToCartButton = document.getElementById("addToCartButton");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", handleAddToCart);
  } else {
    console.error("No 'Add to Cart' button found.");
  }
}

// Function to handle adding a product to the cart
function handleAddToCart(event) {
  // Prevent the default behavior of the button
  event.preventDefault();

  // Retrieve the selected size, color, and quantity from the form
  const selectedSize = document.getElementById("size").value;
  const selectedColor = document.getElementById("color").value;
  const selectedQuantity = document.getElementById("qnty").value;

  // Retrieve the product ID from the URL parameters
  const productId = getClickedProductId();

  // Fetch the product details from the currently displayed product on the page
  const productTitle = document.querySelector(".box h4").textContent;
  const productPrice = document.querySelector(".box h5").textContent;
  const productDescription = document.querySelector(
    ".productDescription p"
  ).textContent;
  const productImageUrl = document
    .querySelector(".box img")
    .getAttribute("src");

  // Create a new product object
  const newProduct = {
    id: productId,
    size: selectedSize,
    color: selectedColor,
    quantity: selectedQuantity,
    title: productTitle,
    price: productPrice,
    description: productDescription,
    imageUrl: productImageUrl,
  };

  // Retrieve the existing products from local storage or initialize an empty array
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Check if the product with the same ID and size already exists in the cart
  const existingProductIndex = productsInCart.findIndex(
    (product) => product.id === productId && product.size === selectedSize
  );

  if (existingProductIndex !== -1) {
    // If the product already exists, increase its quantity
    productsInCart[existingProductIndex].quantity =
      parseInt(productsInCart[existingProductIndex].quantity) +
      parseInt(selectedQuantity);
  } else {
    // If the product doesn't exist, add it to the cart
    productsInCart.push(newProduct);
  }

  // Save the updated products to local storage
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

  // Redirect the user to the cart page
  window.location.href = "/index/cartInfo.html";
}


// Function to update the cart count based on the items in the cart
function updateCartCount() {
  // Retrieve the products from local storage
  const productsInCart =
    JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Calculate the total quantity of items in the cart
  const totalQuantity = productsInCart.reduce(
    (total, product) => total + parseInt(product.quantity),
    0
  );

  // Update the cart count element in the HTML
  const cartCountElement = document.querySelector(".counter");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity.toString();
  } else {
    console.error("Cart count element not found.");
  }
}

// Call updateCartCount function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the clicked product ID from the URL parameters
  const clickedProductId = getClickedProductId();

  // Fetch and display product details based on the clicked product ID
  if (clickedProductId) {
    fetchProductDetails(clickedProductId);
  } else {
    console.error("No product ID found in URL parameters.");
  }
});
