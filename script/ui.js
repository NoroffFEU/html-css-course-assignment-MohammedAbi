// Utility function to show loading spinner or any UI indicator
export const showLoader = () => {
  // You can customize this function based on your UI design
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    loaderElement.style.display = "block";
  }
};

// Utility function to hide loading spinner or any UI indicator
export const hideLoader = () => {
  // You can customize this function based on your UI design
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    loaderElement.style.display = "none";
  }
};