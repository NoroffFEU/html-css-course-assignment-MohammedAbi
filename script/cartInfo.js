

// Function to delete an item from the cart and update local storage
const deleteItemFromCart = (itemId) => {
  try {
    // Get the cart content from localStorage
    let cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];

    // Find the item index in the cart
    const itemIndex = cartContent.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      // If item quantity is greater than 1, decrease the quantity by one
      if (cartContent[itemIndex].quantity > 1) {
        cartContent[itemIndex].quantity--;
      } else {
        // If item quantity is 1 or less, remove the item from the cart
        cartContent.splice(itemIndex, 1);
      }

      // Save the updated cart content back to localStorage
      localStorage.setItem("cartContent", JSON.stringify(cartContent));

      // Log the item removed from the cart
      console.log("Item deleted from cart with ID:", itemId);

      // Update the display of cart content after successful deletion
      displayCartContent();

      // Dispatch a custom event to notify other parts of the application
      const cartUpdatedEvent = new CustomEvent("cartUpdated");
      window.dispatchEvent(cartUpdatedEvent);
    } else {
      console.log("Item not found in the cart.");
    }

    // Show a success message (optional)
    // alert("Item deleted from cart successfully!");
  } catch (error) {
    console.error("Error deleting item from cart:", error.message);
  }
};

// Function to update the cart table with items from localStorage
const updateCartFromLocalStorage = () => {
  try {
    // Get the cart content from localStorage
    const cartContent = JSON.parse(localStorage.getItem("cartContent"));

    if (!cartContent || cartContent.length === 0) {
      console.log("Cart is empty.");
      return;
    }

    // Get the table body element
    const tbody = document.querySelector("#cartContainer table tbody");

    // Get existing rows
    const existingRows = tbody.querySelectorAll("tr");

    // Iterate over each item in the cart and update/add the corresponding row
    cartContent.forEach((item, index) => {
      let row;
      // Check if there's an existing row for this item
      if (existingRows[index]) {
        row = existingRows[index];
      } else {
        // If no existing row, create a new one
        row = document.createElement("tr");
        tbody.appendChild(row);
      }

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
            id="qnty${index + 1}"
            aria-label="Quantity"
          />
        </td>
        <td class="productPrice">$${item.price.toFixed(2)}</td>
        <td>
          <div class="deleteItem" data-id="${item.id}">x</div>
        </td>
      `;
    });

    // Remove any extra rows if cart content is less than existing rows
    if (existingRows.length > cartContent.length) {
      for (let i = cartContent.length; i < existingRows.length; i++) {
        tbody.removeChild(existingRows[i]);
      }
    }

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        deleteItemFromCart(itemId);
      });
    });
  } catch (error) {
    console.error("Error updating cart from localStorage:", error.message);
  }
};


// Function to display the cart content
const displayCartContent = () => {
  const cartContentElement = document.getElementById("cartContainer");

  // Check if the cart content element exists
  if (!cartContentElement) {
    console.error("Cart content element not found.");
    return;
  }

  const cartContent = JSON.parse(localStorage.getItem("cartContent"));

  // Clear the previous content
  cartContentElement.innerHTML = "";

  if (!cartContent || cartContent.length === 0) {
    cartContentElement.textContent = "Cart is empty.";
    return;
  }

  cartContent.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Size: ${item.size}</p>
        <p>Color: ${item.color}</p>
        <p>Quantity: ${item.quantity}</p>
        <button class="deleteItem" data-id="${item.id}">Delete</button>
      </div>
    `;
    cartContentElement.appendChild(itemElement);
  });
};

// Attach event listener to the parent container of delete buttons when the page loads
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteItem")) {
      const itemId = event.target.dataset.id;
      deleteItemFromCart(itemId);
    }
  });
  
  // Call the function to update the cart table from localStorage when the page loads
  updateCartFromLocalStorage();
});
