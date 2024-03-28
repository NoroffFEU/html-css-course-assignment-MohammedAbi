// // Function to retrieve the clicked product ID from the URL parameters
// function getClickedProductId() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   return urlParams.get("id");
// }

// // Function to handle adding a product to the cart
// function handleAddToCart(event) {
//   event.preventDefault();

//   const selectedSize = document.getElementById("size").value;
//   const selectedColor = document.getElementById("color").value;
//   const selectedQuantity = document.getElementById("qnty").value;

//   if (!selectedSize || !selectedColor || !selectedQuantity) {
//     alert("Please select size, color, and quantity before adding to cart.");
//     return;
//   }

//   const productId = getClickedProductId();

//   const productTitle = document.querySelector(".box h4").textContent;
//   const productPrice = document.querySelector(".box h5").textContent;
//   const productDescription = document.querySelector(
//     ".productDescription p"
//   ).textContent;
//   const productImageUrl = document.querySelector(".box img").getAttribute("src");

//   const product = {
//     id: productId,
//     size: selectedSize,
//     color: selectedColor,
//     quantity: selectedQuantity,
//     title: productTitle,
//     price: productPrice,
//     description: productDescription,
//     imageUrl: productImageUrl,
//   };

//   updateCartWithProduct(product);
// }

// // Function to update the cart with the selected product
// function updateCartWithProduct(product) {
//   let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

//   const existingProductIndex = productsInCart.findIndex(
//     (p) => p.id === product.id && p.size === product.size
//   );

//   if (existingProductIndex !== -1) {
//     productsInCart[existingProductIndex].quantity =
//       parseInt(productsInCart[existingProductIndex].quantity) +
//       parseInt(product.quantity);
//   } else {
//     productsInCart.push(product);
//   }

//   localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
//   window.location.href = "/index/cartInfo.html";
// }

// // Function to update the cart count based on the items in the cart
// function updateCartCount() {
//   const productsInCart =
//     JSON.parse(localStorage.getItem("productsInCart")) || [];

//   const totalQuantity = productsInCart.reduce(
//     (total, product) => total + parseInt(product.quantity),
//     0
//   );

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
//   const clickedProductId = getClickedProductId();

//   if (clickedProductId) {
//     fetchProductDetails(clickedProductId);
//   } else {
//     console.error("No product ID found in URL parameters.");
//   }
// });

// // Fetch product details from the server using the product ID
// async function fetchProductDetails(productId) {
//   try {
//     const response = await fetch(
//       `https://v2.api.noroff.dev/rainy-days/${productId}`
//     );

//     if (response.ok) {
//       const product = await response.json();
//       displayProductDetails(product);
//     } else {
//       throw new Error(
//         "Failed to fetch product details with status: " + response.status
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//   }
// }

// // Display product details on the page
// function displayProductDetails(product) {
//   const productContainer = document.querySelector(".collectionItems");
//   productContainer.innerHTML = "";

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
//             <label for="qnty">Qnty</label>
//             <select name="qnty" id="qnty">
//               <option value="">Qnty</option>
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

//   productContainer.appendChild(productBox);

//   const addToCartButton = document.getElementById("addToCartButton");
//   if (addToCartButton) {
//     addToCartButton.addEventListener("click", handleAddToCart);
//   } else {
//     console.error("No 'Add to Cart' button found.");
//   }
// }

// Importing functions from separate files
import { getClickedProductId } from "./getClickedProductId.js";
import { updateCartCount } from "./updateCartCount.js";
import { fetchProductDetails } from "./fetchProductDetails.js";

// Call updateCartCount function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const clickedProductId = getClickedProductId();

  if (clickedProductId) {
    fetchProductDetails(clickedProductId);
  } else {
    console.error("No product ID found in URL parameters.");
  }
});
