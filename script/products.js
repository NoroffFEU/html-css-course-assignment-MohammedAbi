import { loginUser } from "../script/user.js";

let products = [];
let clickedProduct = null;

async function renderProducts() {
  // // Clear local storage before fetching products
  // localStorage.clear();
  try {
    const token = await loginUser(
      "https://v2.api.noroff.dev/auth/login",
      "mohammed.abi@stud.noroff.no",
      "Skuraane2024"
    );

    const response = await fetch("https://v2.api.noroff.dev/rainy-days", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Failed to fetch products with status: " + response.status
      );
    }

    const { data } = await response.json();
    products = data;
    renderProductsInHTML();
  } catch (error) {
    console.error("Error rendering products:", error);
  }
}

function renderProductsInHTML() {
  try {
    const productContainer = document.getElementById("productContainer");
    if (!productContainer) {
      throw new Error("Product container not found in HTML.");
    }

    productContainer.innerHTML = "";

    if (!Array.isArray(products)) {
      throw new Error("Products is not an array:", products);
    }

    products.forEach((product) => {
      const { id, title, description, image, sizes, price, gender } = product;

      const box = document.createElement("div");
      box.classList.add("box");

      box.dataset.productId = id;

      const productLink = document.createElement("a");
      productLink.href = `/index/productSpecificPage.html?id=${id}`;

      const productImage = document.createElement("img");
      productImage.src = image.url;
      productImage.alt = image.alt || "Product Image";

      const productName = document.createElement("h4");
      productName.textContent = title;

      const productDescription = document.createElement("p");
      productDescription.textContent = description;

      const productPrice = document.createElement("h5");
      productPrice.textContent = `$${price}`;

      const productGender = document.createElement("p");
      productGender.textContent = gender;

      const productSizes = document.createElement("p");
      productSizes.textContent = "Sizes: " + sizes.join(", ");

      const cartIcon = document.createElement("div");
      cartIcon.classList.add("cart");
      const shoppingBagIcon = document.createElement("i");
      shoppingBagIcon.classList.add("bx", "bx-shopping-bag");
      cartIcon.appendChild(shoppingBagIcon);

      productLink.appendChild(productImage);
      box.appendChild(productLink);
      box.appendChild(productName);
      box.appendChild(productDescription);
      box.appendChild(productPrice);
      box.appendChild(productGender);
      box.appendChild(productSizes);
      box.appendChild(cartIcon);

      productContainer.appendChild(box);
    });

    const productBoxes = document.querySelectorAll(".box");
    productBoxes.forEach((box) => {
      box.addEventListener("click", handleProductClick);
    });
  } catch (error) {
    console.error("Error rendering products in HTML:", error);
  }
}

function handleProductClick(event) {
  try {
    const productBox = event.currentTarget;
    const productId = productBox.dataset.productId;
    if (!productId) {
      throw new Error("Product ID not found in the clicked product box.");
    }

    const productTitle = productBox.querySelector("h4").textContent;
    const productDescription = productBox.querySelector("p").textContent;
    const productGender =
      productBox.querySelector("p:nth-child(5)").textContent;
    const productSizes = productBox
      .querySelector("p:nth-child(6)")
      .textContent.replace("Sizes: ", "")
      .split(", ");

    const productData = products.find((product) => product.id === productId);
    if (!productData) {
      throw new Error("Product data not found for productId:", productId);
    }

    const { baseColor, price, image } = productData;

    const productPrice = parseFloat(price);

    const productImageUrl = image.url;
    const productImageAlt = image.alt;

    const product = {
      id: productId,
      title: productTitle,
      description: productDescription,
      gender: productGender,
      sizes: productSizes,
      baseColor: baseColor,
      price: productPrice,
      image: {
        url: productImageUrl,
        alt: productImageAlt,
      },
      qnty: 1,
    };

    clickedProduct = product;
    console.log("Clicked product:", clickedProduct);
    window.location.href = `/index/productSpecificPage.html?id=${productId}`;
  } catch (error) {
    console.error("Error handling product click:", error);
  }
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

export { products, renderProducts, clickedProduct };
