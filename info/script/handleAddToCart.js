import { getClickedProductId } from "./getClickedProductId.js";

// Function to handle adding a product to the cart
function handleAddToCart(event) {
  event.preventDefault();

  const selectedSize = document.getElementById("size").value;
  const selectedColor = document.getElementById("color").value;
  // const selectedQuantity = document.getElementById("qnty").value;
  const selectedQuantity = parseInt(document.getElementById("qnty").value);

  if (!selectedSize || !selectedColor || !selectedQuantity) {
    alert("Please select size, color, and quantity before adding to cart.");
    return;
  }

  const productId = getClickedProductId();
  const productDetails = getProductDetails();
  const product = {
    id: productId,
    size: selectedSize,
    color: selectedColor,
    quantity: selectedQuantity,
    ...productDetails,
  };

  updateCartWithProduct(product);
}

// Function to retrieve product details from the page
function getProductDetails() {
  const productTitle = document.querySelector(".box h4").textContent;
  const productPrice = document.querySelector(".box h5").textContent;
  const productDescription = document.querySelector(
    ".productDescription p"
  ).textContent;
  const productImageUrl = document
    .querySelector(".box img")
    .getAttribute("src");

  return {
    title: productTitle,
    price: productPrice,
    description: productDescription,
    imageUrl: productImageUrl,
  };
}

// Function to update the cart with the selected product
function updateCartWithProduct(product) {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

  const existingProductIndex = productsInCart.findIndex(
    (p) => p.id === product.id && p.size === product.size
  );

  if (existingProductIndex !== -1) {
    productsInCart[existingProductIndex].quantity =
      parseInt(productsInCart[existingProductIndex].quantity) +
      parseInt(product.quantity);
  } else {
    productsInCart.push(product);
  }

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  window.location.href = "./cartInfo.html";
}

export { handleAddToCart };
