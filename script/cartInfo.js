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

// Function to login a user
const loginUser = async (url, email, password) => {
  try {
    // Show loader while waiting for the response
    showLoader();
    
    const requestBody = {
      email: email,
      password: password,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      console.log("User logged in successfully:");
      const data = await response.json();
      console.log("User Data:", data);

      // After successful login, fetch and update cart
      fetchProductsAndUpdateCart();
    } else {
      throw new Error("Login failed with status: " + response.status);
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    // Hide loader regardless of success or failure
    hideLoader();
  }
};

// Function to clear the cart
const clearCart = () => {
  const cartItemsContainer = document.querySelector(".cartInfo tbody");
  cartItemsContainer.innerHTML = ''; // Clear the cart
};

// Function to update the cart with a selected product
const updateCartWithProduct = (product) => {
  const cartItemsContainer = document.querySelector(".cartInfo tbody");

  // Create a new row for the selected product
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>
      <div class="productImage">
        <img src="${product.image.url}" alt="${product.title}" />
      </div>
    </td>
    <td>
      <h3>${product.title}</h3>
      <p>${product.description}</p>
    </td>
    <td class="productSize">${product.sizes.join(', ')}</td>
    <td class="productColor">${product.baseColor}</td>
    <td>
      <input type="number" value="1" aria-label="Quantity" />
    </td>
    <td class="productPrice">$${product.price}</td>
    <td>
      <div class="deleteItem">x</div>
    </td>
  `;

  // Append the new row to the cart items container
  cartItemsContainer.appendChild(newRow);
};

// Function to fetch products and update the cart
const fetchProductsAndUpdateCart = async () => {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");

    if (response.ok) {
      const responseData = await response.json();
      const products = responseData.data;

      // Clear the cart before updating with the fetched products
      clearCart();

      // Update the cart with the fetched products
      products.forEach(product => {
        updateCartWithProduct(product);
      });
    } else {
      throw new Error("Failed to retrieve products with status: " + response.status);
    }
  } catch (error) {
    console.error("Error fetching and updating cart:", error.message);
  }
};

// Call the loginUser function with the specified URL, email, and password
loginUser(
  "https://v2.api.noroff.dev/auth/login",
  "mohammed.abi@stud.noroff.no",
  "Skuraane2024"
);
