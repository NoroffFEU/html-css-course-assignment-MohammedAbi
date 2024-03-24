<<<<<<< Updated upstream
// // Function to delete an item from the cart and update local storage
// const deleteItemFromCart = (itemId) => {
//   try {
//     // Get the cart content from localStorage
//     let cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];

//     // Find the item index in the cart
//     const itemIndex = cartContent.findIndex((item) => item.id === itemId);

//     if (itemIndex !== -1) {
//       // Decrease the quantity by one
//       if (cartContent[itemIndex].quantity > 1) {
//         cartContent[itemIndex].quantity--;
//       } else {
//         // If item quantity is 1, remove the item from the cart
//         cartContent.splice(itemIndex, 1);
//       }

//       // Save the updated cart content back to localStorage
//       localStorage.setItem("cartContent", JSON.stringify(cartContent));

//       // Log the item deleted from the cart
//       console.log("Item deleted from cart with ID:", itemId);

//       // Update the display of cart content after successful deletion
//       displayCartContent();

//       // Dispatch a custom event to notify other parts of the application
//       const cartUpdatedEvent = new CustomEvent("cartUpdated");
//       window.dispatchEvent(cartUpdatedEvent);
//     } else {
//       console.log("Item not found in the cart.");
//     }
//   } catch (error) {
//     console.error("Error deleting item from cart:", error.message);
//   }
// };

// // Function to update the cart table with items from localStorage
// const updateCartFromLocalStorage = () => {
//   try {
//     // Get the cart content from localStorage
//     const cartContent = JSON.parse(localStorage.getItem("cartContent"));

//     // Get the cart container element
//     const cartContainer = document.getElementById("cartContainer");

//     if (!cartContent || cartContent.length === 0) {
//       // Cart is empty
//       cartContainer.innerHTML = "<h2 class='empty-cart-message'>Your cart is empty!</h2>";
//       return;
//     }

//     // Get the table body element
//     const tbody = cartContainer.querySelector("table tbody");

//     // Clear the existing content
//     tbody.innerHTML = "";

//     // Iterate over each item in the cart and update/add the corresponding row
//     cartContent.forEach((item, index) => {
//       const row = document.createElement("tr");

//       // Update the content of the row
//       row.innerHTML = `
//         <td>
//           <div class="productImage">
//             <img src="${item.image}" alt="${item.name}" />
//           </div>
//         </td>
//         <td>
//           <h3>${item.name}</h3>
//           <p>${item.description}</p>
//         </td>
//         <td class="productSize">${item.size}</td>
//         <td class="productColor">${item.color}</td>
//         <td>
//           <input
//             type="number"
//             value="${item.quantity}"
//             aria-label="Quantity"
//             disabled
//           />
//         </td>
//         <td class="productPrice">$${item.price.toFixed(2)}</td>
//         <td>
//           <button class="deleteItem" data-id="${item.id}">Delete</button>
//         </td>
//       `;

//       // Attach event listener to delete button
//       const deleteButton = row.querySelector(".deleteItem");
//       deleteButton.addEventListener("click", () => {
//         deleteItemFromCart(item.id);
//       });

//       // Append the row to the tbody
//       tbody.appendChild(row);
//     });
//   } catch (error) {
//     console.error("Error updating cart from localStorage:", error.message);
//   }
// };

// // Function to display the cart content
// const displayCartContent = () => {
//   updateCartFromLocalStorage();
// };

// // Attach event listener to the parent container of delete buttons when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   // Call the function to update the cart table from localStorage when the page loads
//   displayCartContent();
// });


// // Attach event listener to the parent container of delete buttons when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   // Call the function to update the cart table from localStorage when the page loads
//   displayCartContent();
// });


// --------test

// Function to delete an item from the cart and update local storage
const deleteItemFromCart = (itemId) => {
  try {
    // Get the cart content from localStorage
    let cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];
=======
// // Function to display products in the cart
// function displayProductsInCart(products) {
//   // Select the table body element to append cart items
//   const tbody = document.querySelector(".tbody");
>>>>>>> Stashed changes

//   // Clear previous content
//   tbody.innerHTML = "";

//   // Check if there are products in the cart
//   if (products.length === 0) {
//     tbody.innerHTML = "<tr><td colspan='7'>Your cart is empty.</td></tr>";
//     console.log("Cart is empty.");
//     return;
//   }

//   // Loop through each product and create HTML elements to display them
//   products.forEach((product, index) => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>
//         <div class="productImage">
//           <img src="${product.imageUrl}" alt="${product.title}" />
//         </div>
//       </td>
//       <td>
//         <h3>${product.title}</h3>
//         <p>${product.description}</p>
//       </td>
//       <td class="productSize">${product.size}</td>
//       <td class="productColor">${product.color}</td>
//       <td>
//         <input type="number" value="${product.quantity}" id="qnty${
//       index + 1
//     }" aria-label="Quantity" />
//       </td>
//       <td class="productPrice">${product.price}</td>
//       <td>
//         <div class="deleteItem" onclick="removeCartItem(${index})">x</div>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });

//   console.log("Displayed products in cart:", JSON.stringify(products));
// }

<<<<<<< Updated upstream
      // Update the display of cart content after successful deletion
      updateCartFromLocalStorage();
=======
// // Function to remove a product from the cart
// function removeCartItem(index) {
//   // Retrieve products from local storage
//   let products = JSON.parse(localStorage.getItem("productsInCart")) || [];
>>>>>>> Stashed changes

//   // Remove the product at the specified index
//   products.splice(index, 1);

//   // Update local storage
//   localStorage.setItem("productsInCart", JSON.stringify(products));

//   // Display updated cart
//   displayProductsInCart(products);
//   console.log("Removed product at index", index);
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
//   // Retrieve the products from local storage
//   const productsInCart =
//     JSON.parse(localStorage.getItem("productsInCart")) || [];

//   // Display the products in the cart
//   displayProductsInCart(productsInCart);
// });

// ------------Everything works

// Function to display products in the cart
function displayProductsInCart(products) {
  // Select the table body element to append cart items
  const tbody = document.querySelector(".tbody");

  // Clear previous content
  tbody.innerHTML = "";

  // Function to remove a product from the cart
  function removeCartItem(index) {
    // Retrieve products from local storage
    let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

    // Get the product at the specified index
    const productToRemove = products[index];

    // If the quantity is greater than 1, decrement it by one
    if (productToRemove.quantity > 1) {
      productToRemove.quantity -= 1;
    } else {
<<<<<<< Updated upstream
      console.log("Item not found in the cart.");
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error.message);
  }
};

// Function to update the cart table with items from localStorage
const updateCartFromLocalStorage = () => {
  try {
    // Get the cart content from localStorage
    const cartContent = JSON.parse(localStorage.getItem("cartContent"));

    // Get the cart container element
    const cartContainer = document.getElementById("cartContainer");

    if (!cartContent || cartContent.length === 0) {
      // Cart is empty
      cartContainer.innerHTML = "<h2 class='empty-cart-message'>Your cart is empty!</h2>";
      updateItemCount(0); // Update item count in cart counter
      updateTotalPrice(0); // Update total price in cart
      return;
    }

    // Get the table body element
    const tbody = cartContainer.querySelector("table tbody");

    // Clear the existing content
    tbody.innerHTML = "";

    // Variables to store total quantity and price
    let totalQuantity = 0;
    let totalPrice = 0;

    // Iterate over each item in the cart and update/add the corresponding row
    cartContent.forEach((item, index) => {
      const row = document.createElement("tr");

      // Update the content of the row
      row.innerHTML = `
        <td>
          <div class="productImage">
            <img src="${item.image}" alt="${item.name}" />
          </div>
        </td>
        <td>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </td>
        <td class="productSize">${item.size}</td>
        <td class="productColor">${item.color}</td>
        <td>
          <input
            type="number"
            value="${item.quantity}"
            aria-label="Quantity"
            disabled
          />
        </td>
        <td class="productPrice">$${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="deleteItem" data-id="${item.id}">Delete</button>
        </td>
      `;

      // Update total quantity and price
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;

      // Attach event listener to delete button
      const deleteButton = row.querySelector(".deleteItem");
      deleteButton.addEventListener("click", () => {
        deleteItemFromCart(item.id);
      });

      // Append the row to the tbody
      tbody.appendChild(row);
    });

    // Update total quantity and price in the cart display
    updateItemCount(totalQuantity);
    updateTotalPrice(totalPrice);
  } catch (error) {
    console.error("Error updating cart from localStorage:", error.message);
=======
      // Otherwise, remove the product entirely
      products.splice(index, 1);
    }

    // Update local storage
    localStorage.setItem("productsInCart", JSON.stringify(products));

    // Display updated cart
    displayProductsInCart(products);
    console.log("Removed product at index", index);
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
// Function to update the item count in cart counter
const updateItemCount = (count) => {
  const counterElement = document.querySelector(".counter");
  if (counterElement) {
    counterElement.textContent = count.toString();
  }
};

// Function to update the total price in cart
const updateTotalPrice = (price) => {
  const existingCartTotal = document.querySelector(".cartTotal");
  
  if (existingCartTotal) {
    // Create a new cartTotal div with the updated total price
    const newCartTotal = document.createElement("div");
    newCartTotal.classList.add("cartTotal");

    newCartTotal.innerHTML = `
      <div class="totalPrice">
        <h3>Total Price:</h3>
        <p>$${price.toFixed(2)}</p>
      </div>
      <div class="ctaCart">
        <div>
          <p>
            <a href="/index/productPage.html">
              <i class="bx bx-chevron-left"></i>
              Continue Shopping
            </a>
          </p>
        </div>
        <button class="submitButton" id="submitButton">Submit</button>
      </div>
    `;

    // Replace existing cartTotal with the new one
    existingCartTotal.parentNode.replaceChild(newCartTotal, existingCartTotal);
  }
};


// Function to display the cart content
const displayCartContent = () => {
  updateCartFromLocalStorage();
};
=======
  // Ensure removeCartItem is defined globally
  window.removeCartItem = removeCartItem;
>>>>>>> Stashed changes

  let totalPrice = 0; // Initialize total price

  // Check if there are products in the cart
  if (products.length === 0) {
    // Display message when cart is empty
    tbody.innerHTML = "<tr><td colspan='7'><h4>Your cart is empty!!</h4></td></tr>";
    console.log("Cart is empty.");

    // Update the cart count element to 0 when the cart is empty
    const cartCountElement = document.querySelector(".counter");
    if (cartCountElement) {
      cartCountElement.textContent = "0";
    } else {
      console.error("Cart count element not found.");
    }

    return; // Return early if cart is empty
  }

  // Initialize total quantity of items in the cart
  let totalQuantity = 0;

  // Loop through each product and create HTML elements to display them
  products.forEach((product, index) => {
    // Remove the dollar sign and parse the price as a float
    const price = parseFloat(product.price.replace('$', ''));

    // Check if the parsed price is a valid number
    if (isNaN(price)) {
      console.error(`Invalid price for product at index ${index}`);
      return; // Skip this product if price is invalid
    }

    // Display unit price for each item
    const unitPrice = price.toFixed(2);

    // Calculate the total price for the current item considering its quantity
    const itemTotalPrice = product.quantity * price;
    totalPrice += itemTotalPrice; // Add to the total price

    // Update total quantity
    totalQuantity += parseInt(product.quantity);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="productImage">
          <img src="${product.imageUrl}" alt="${product.title}" />
        </div>
      </td>
      <td>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
      </td>
      <td class="productSize">${product.size}</td>
      <td class="productColor">${product.color}</td>
      <td>
        <input type="number" value="${product.quantity}" id="qnty${index + 1}" aria-label="Quantity" />
      </td>
      <td class="productPrice">${unitPrice}</td> <!-- Display unit price -->
      <td class="totalItemPrice">${itemTotalPrice.toFixed(2)}</td> <!-- Display total item price -->
      <td>
        <div class="deleteItem" onclick="removeCartItem(${index})">x</div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update the total price element in the HTML
  const totalPriceElement = document.querySelector(".totalPrice p");
  if (totalPriceElement) {
    totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
  } else {
    console.error("Total price element not found.");
  }

  // Update the cart count element in the HTML
  const cartCountElement = document.querySelector(".counter");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity.toString();
  } else {
    console.error("Cart count element not found.");
  }

  console.log("Displayed products in cart:", JSON.stringify(products));
}

// Function to remove a product from the cart
function removeCartItem(index) {
  // Retrieve products from local storage
  let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Remove the product at the specified index
  products.splice(index, 1);

  // Update local storage
  localStorage.setItem("productsInCart", JSON.stringify(products));

  // Display updated cart
  displayProductsInCart(products);
  console.log("Removed product at index", index);
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
  // Retrieve the products from local storage
  const productsInCart =
    JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Display the products in the cart
  displayProductsInCart(productsInCart);
});
