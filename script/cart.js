// import { displayProductsInCart } from "./displayProductsInCart.js";
// import { updateCartCount } from "./cartUtils.js";

// document.addEventListener("DOMContentLoaded", function () {
//   // Retrieve the products from local storage
//   const productsInCart =
//     JSON.parse(localStorage.getItem("productsInCart")) || [];

//   // Display the products in the cart
//   displayProductsInCart(productsInCart);

//   // Calculate total quantity
//   const totalQuantity = getTotalQuantity(productsInCart);

//   // Update the cart count with the total quantity
//   updateCartCount(totalQuantity);

//   // Add event listener to the submit button
//   const submitButton = document.getElementById("submitButton");
//   if (submitButton) {
//     submitButton.addEventListener("click", function () {
//       // Redirect the user to the specified location
//       window.location.href = "/index/delivery.html";
//     });
//   } else {
//     console.error("Submit button not found.");
//   }
// });

// // Function to calculate the total quantity of items in the cart
// function getTotalQuantity(products) {
//   return products.reduce(
//     (total, product) => total + parseInt(product.quantity),
//     0
//   );
// }

// works perfect

import { displayProductsInCart } from "./displayProductsInCart.js";
import { updateCartCount } from "./cartUtils.js";

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the products from local storage
  const productsInCart =
    JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Display the products in the cart
  displayProductsInCart(productsInCart);

  // Calculate total quantity
  const totalQuantity = getTotalQuantity(productsInCart);

  // Update the cart count with the total quantity
  updateCartCount(totalQuantity);

  // Add event listener to the submit button
  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      // Redirect the user to the specified location
      window.location.href = "/index/delivery.html";
    });
  } else {
    console.error("Submit button not found.");
  }
});

// Function to calculate the total quantity of items in the cart
function getTotalQuantity(products) {
  return products.reduce(
    (total, product) => total + parseInt(product.quantity),
    0
  );
}
