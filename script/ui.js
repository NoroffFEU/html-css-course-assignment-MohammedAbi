// Utility function to show loading spinner or any UI indicator
export const showLoader = () => {
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    loaderElement.style.display = "block";
  }
};

// Utility function to hide loading spinner or any UI indicator
export const hideLoader = () => {
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    loaderElement.style.display = "none";
  }
};
