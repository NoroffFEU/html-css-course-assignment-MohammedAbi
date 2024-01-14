document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

// document.addEventListener("click", (e) => {
//   const isDropdownButton = e.target.matches("[data-dropdown-button]");
//   const isDropdownLink = e.target.matches(".dropdownLinks .link");

//   if (isDropdownLink) {
//     e.preventDefault();
//     const selectedText = e.target.innerText;
//     const dropdown = e.target.closest("[data-dropdown]");
//     const dropdownButton = dropdown.querySelector("[data-dropdown-button]");

//     // Check if the button has a text node, create one if not
//     if (
//       !dropdownButton.firstChild ||
//       dropdownButton.firstChild.nodeType !== Node.TEXT_NODE
//     ) {
//       const textNode = document.createTextNode("");
//       dropdownButton.innerHTML = ""; // Clear existing content
//       dropdownButton.appendChild(textNode);
//     }

//     // Set the text content of the button's text node
//     dropdownButton.firstChild.textContent = `${selectedText} `;
//     dropdown.classList.remove("active");
//     return;
//   }

//   // Toggle the dropdown when the button is clicked
//   if (isDropdownButton) {
//     e.preventDefault(); // Prevent the default behavior of buttons
//     const dropdown = e.target.closest("[data-dropdown]");
//     dropdown.classList.toggle("active");
//     return;
//   }

//   // Close the dropdown when clicking outside
//   const activeDropdown = document.querySelector("[data-dropdown].active");
//   if (activeDropdown) {
//     activeDropdown.classList.remove("active");
//   }
// });

