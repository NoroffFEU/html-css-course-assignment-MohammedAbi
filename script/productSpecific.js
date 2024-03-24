// Function to retrieve the clicked product ID from the URL parameters
function getClickedProductId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}

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
