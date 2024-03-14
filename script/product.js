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
        // Add any additional headers here
        Authorization: "Bearer your_auth_token", // Example of adding an authentication token
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 200) {
      console.log("User logged in successfully:");
      const data = await response.json();
      console.log("User Data:", data);
    } else {
      throw new Error("Login failed with status: " + response.status);
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    // Hide loader regardless of success or failure
    hideLoader();
  }
};

// Call the loginUser function with the specified URL, email, and password
loginUser(
  "https://v2.api.noroff.dev/auth/login",
  "mohammed.abi@stud.noroff.no",
  "Skuraane2024"
);

// Function to retrieve all products
const getAllProducts = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      console.log("Product Data:", responseData);

      const products = responseData.data;

      if (products.length > 0) {
        console.log("All Product Data:", products);
        updateProductBoxes(products);
      } else {
        throw new Error("No products found.");
      }
    } else {
      throw new Error(
        "Failed to retrieve products with status: " + response.status
      );
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    // Hide loader regardless of success or failure
    hideLoader();
  }
};

// Function to dynamically update product information
const updateProductBoxes = (products) => {
  const productContainer = document.getElementById("productContainer");

  // Clear existing content in the container
  productContainer.innerHTML = "";

  // Create gender filter container with styling
  const genderFilterContainer = document.createElement("div");
  genderFilterContainer.classList.add("gender-filter-container");
  genderFilterContainer.innerHTML = `
    <div class="gender-filter">
    <h4>Select Gender:</h4>
      <label><input type="radio" name="gender" value="male" onchange="filterProducts(this.value)"> Male</label>
      <label><input type="radio" name="gender" value="female" onchange="filterProducts(this.value)"> Female</label>
    </div>
  `;

  // Insert the gender filter before the product container
  productContainer.parentNode.insertBefore(
    genderFilterContainer,
    productContainer
  );

  // Iterate through each product and create a product box
  products.forEach((product) => {
    const productBox = document.createElement("div");
    productBox.classList.add("box");
    productBox.dataset.gender = product.gender.toLowerCase(); // Set data-gender attribute

    productBox.innerHTML = `
            <a href="/index/productSpecificPage.html?id=${product.id}">
              <img src="${product.image.url}" alt="${
      product.description
    }" id="productImage" />
            </a>
            <h4 id="productName">${product.title}</h4>
            <h5 id="productPrice">$${product.price.toFixed(2)}</h5>
            <div class="cart">
              <i class="bx bx-shopping-bag" id="bx-shopping-bag"></i>
            </div>
          `;

    // Append the product box to the container
    productContainer.appendChild(productBox);
  });
};

// Function to filter products by gender
const filterProducts = (gender) => {
  const productContainer = document.getElementById("productContainer");
  const productBoxes = productContainer.getElementsByClassName("box");

  // Iterate through product boxes and hide/show based on gender
  Array.from(productBoxes).forEach((box) => {
    const productGender = box.dataset.gender;
    const showProduct = gender === productGender;
    box.style.display = showProduct ? "block" : "none";
  });
};

// Fetch all products when the page loads
getAllProducts("https://v2.api.noroff.dev/rainy-days");
