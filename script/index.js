// Import functions from different modules
import { loginUser } from "../script/aut.js";
import { getAllProducts, updateProductBoxes } from "../script/product.js";
import { showLoader, hideLoader } from "../script/ui.js";

// Call the loginUser function with the specified URL, email, and password
loginUser(
  "https://v2.api.noroff.dev/auth/login",
  "mohammed.abi@stud.noroff.no",
  "Skuraane2024"
);

// Call the getAllProducts function with the specified URL
getAllProducts("https://v2.api.noroff.dev/rainy-days");

// Call other functions as needed
// ...
