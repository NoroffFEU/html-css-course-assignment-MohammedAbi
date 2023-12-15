// Get all dropdowns from the document
const dropdowns = document.querySelectorAll(".dropdown");

// Loop through all dropdown elements
dropdowns.forEach((dropdown) => {
  // Get inner elements from each dropdown
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  // Add a click event to the select element
  select.addEventListener("click", () => {
    // Add the clicked select styles to the select element
    select.classList.toggle("selectClicked");
    // Add the rotate styles to the caret element
    caret.classList.toggle("caretRotate");
    // Add the open styles to the menu element
    menu.classList.toggle("menuOpen");
  });

  // Loop through all option elements
  options.forEach((option) => {
    // Add a click event to the option element
    option.addEventListener("click", () => {
      // Change selected inner text to clicked option inner text
      selected.innerText = option.innerText;
      // Add the clicked select style to the select element
      select.classList.remove("selectClicked");
      // Add the rotate style to the caret element
      caret.classList.remove("caretRotate");
      // Add the open style to the menu element
      menu.classList.remove("menuOpen");
      // Remove active class from all option elements
      options.forEach((opt) => {
        opt.classList.remove("active");
      });
      // Add active class to clicked option element
      option.classList.add("active");
    });
  });
});
