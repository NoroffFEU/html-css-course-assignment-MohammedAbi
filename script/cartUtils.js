// // Import the displayProductsInCart function
// import { displayProductsInCart } from "./displayProductsInCart.js";

// // Function to remove a product from the cart
// function removeCartItem(index) {
//   // Retrieve products from local storage
//   let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

//   // Get the product at the specified index
//   const productToRemove = products[index];

//   // If the quantity is greater than 1, decrement it by one
//   if (productToRemove.quantity > 1) {
//     productToRemove.quantity -= 1;
//   } else {
//     // Otherwise, remove the product entirely
//     products.splice(index, 1);
//   }

//   // Update local storage
//   localStorage.setItem("productsInCart", JSON.stringify(products));

//   // Display updated cart
//   displayProductsInCart(products);
//   console.log("Removed product at index", index);
// }

// // Function to update the cart count based on the items in the cart
// function updateCartCount(totalQuantity) {
//   // Update the cart count element in the HTML
//   const cartCountElement = document.querySelector(".counter");
//   if (cartCountElement) {
//     cartCountElement.textContent = totalQuantity.toString();
//   } else {
//     console.error("Cart count element not found.");
//   }
// }

// // Export the functions
// export { removeCartItem, updateCartCount };

// works perfect

// Import the shared functions
import { removeCartItem, updateCartCount } from "./removeCartItem.js";

// Export the functions
export { removeCartItem, updateCartCount };
