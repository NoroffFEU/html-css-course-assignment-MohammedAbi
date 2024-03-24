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
      // Otherwise, remove the product entirely
      products.splice(index, 1);
    }

    // Update local storage
    localStorage.setItem("productsInCart", JSON.stringify(products));

    // Display updated cart
    displayProductsInCart(products);
    console.log("Removed product at index", index);
  }

  // Ensure removeCartItem is defined globally
  window.removeCartItem = removeCartItem;

  let totalPrice = 0; // Initialize total price

  // Check if there are products in the cart
  if (products.length === 0) {
    // Display message when cart is empty
    tbody.innerHTML =
      "<tr><td colspan='7'><h4>Your cart is empty!!</h4></td></tr>";
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
    const price = parseFloat(product.price.replace("$", ""));

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
        <input type="number" value="${product.quantity}" id="qnty${
      index + 1
    }" aria-label="Quantity" />
      </td>
      <td class="productPrice">${unitPrice}</td> <!-- Display unit price -->
      <td class="totalItemPrice">${itemTotalPrice.toFixed(
        2
      )}</td> <!-- Display total item price -->
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
