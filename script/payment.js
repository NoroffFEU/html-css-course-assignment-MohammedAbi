// Define an array of objects representing the payment fields
const paymentFields = [
  { id: "cardNumber", placeholder: "Card Number" },
  { id: "expMonth", placeholder: "Exp. Month" },
  { id: "expDate", placeholder: "Exp. Date" },
  { id: "cvv", placeholder: "CVV" },
  { id: "cardHolder", placeholder: "Card Holder" },
];

// Function to generate payment input fields
function generatePaymentInputs() {
  try {
    const paymentFormContainer = document.getElementById("paymentFormContainer");
    if (!paymentFormContainer) {
      console.error("Payment form container not found.");
      return;
    }

    paymentFields.forEach((field) => {
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.id = field.id;
      inputField.placeholder = field.placeholder;
      inputField.classList.add("formItem");

      paymentFormContainer.appendChild(inputField);
    });
  } catch (error) {
    console.error("Error generating payment inputs:", error);
  }
}

// Function to validate if all payment fields are filled
function validatePaymentForm() {
  let isValid = true;
  let errorMessage = "";

  paymentFields.forEach((field) => {
    const inputField = document.getElementById(field.id);
    if (inputField && !inputField.value.trim()) {
      isValid = false;
      errorMessage += `${field.placeholder} is required.\n`;
      if (!inputField.classList.contains("error")) {
        inputField.classList.add("error");
      }
    } else {
      // Additional validation for specific fields
      switch (field.id) {
        case "cardNumber":
          if (inputField.value.trim().length < 8) {
            isValid = false;
            errorMessage += "Card Number must have at least 8 characters.\n";
            inputField.classList.add("error");
          }
          break;
        case "expMonth":
        case "expDate":
          if (!/^\d{2}$/.test(inputField.value.trim())) {
            isValid = false;
            errorMessage += `${field.placeholder} must be two digits.\n`;
            inputField.classList.add("error");
          }
          break;
        case "cvv":
          if (!/^\d{3}$/.test(inputField.value.trim())) {
            isValid = false;
            errorMessage += "CVV must be three digits.\n";
            inputField.classList.add("error");
          }
          break;
        case "cardHolder":
          const cardHolder = inputField.value.trim().split(" ");
          if (cardHolder.length !== 2) {
            isValid = false;
            errorMessage += "Card Holder must include both first name and last name.\n";
            inputField.classList.add("error");
          }
          break;
        default:
          break;
      }
    }
  });

  if (!isValid) {
    alert(errorMessage);
  }

  return isValid;
}

// Function to capture filled payment values and redirect if form is valid
function capturePaymentValues() {
  try {
    const isValidForm = validatePaymentForm();
    if (!isValidForm) {
      return; // Don't proceed if form is invalid
    }

    const filledValues = {};

    paymentFields.forEach((field) => {
      const inputField = document.getElementById(field.id);
      if (inputField) {
        filledValues[field.id] = inputField.value;
      }
    });

    console.log("Filled payment values:", filledValues);

    // Retrieve existing data from local storage or initialize as an empty array
    const existingData = JSON.parse(localStorage.getItem("filledValues")) || [];

    // Append the new filled values to the existing data array
    existingData.push(filledValues);

    // Store the updated array back in local storage
    localStorage.setItem("filledValues", JSON.stringify(existingData));

    console.log("Filled values stored in local storage:", existingData);
    // Now you can use the filledValues object as needed

    // Redirect the user to the payment confirmation page
    location.href = "/index/successPage.html";
  } catch (error) {
    console.error("Error capturing filled payment values:", error);
  }
}

// Call the function to generate payment inputs when the page loads
document.addEventListener("DOMContentLoaded", () => {
  generatePaymentInputs();

  // Add event listener to the submit button to capture filled values when clicked
  const paymentSubmitButton = document.getElementById("paymentSubmitButton");
  if (paymentSubmitButton) {
    paymentSubmitButton.addEventListener("click", capturePaymentValues);
  } else {
    console.error("Payment submit button not found.");
  }
});

// Function to calculate and display the total price of the items in the cart
function displayTotalPriceInPaymentButton() {
  // Retrieve the products from local storage
  const productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Calculate the total price
  let totalPrice = 0;
  productsInCart.forEach((product) => {
    const price = parseFloat(product.price.replace("$", ""));
    totalPrice += price * product.quantity;
  });

  // Update the payment button text with the total price
  const paymentSubmitButton = document.getElementById("paymentSubmitButton");
  if (paymentSubmitButton) {
    paymentSubmitButton.textContent = `Total Payment $${totalPrice.toFixed(2)}`;
  } else {
    console.error("Payment submit button not found.");
  }
}

// Call the function to display the total price in the payment button when the page loads
document.addEventListener("DOMContentLoaded", displayTotalPriceInPaymentButton);