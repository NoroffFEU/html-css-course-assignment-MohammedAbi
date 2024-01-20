let elements = document.getElementsByClassName("bx-shopping-bag");

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function () {
    location.href = "/index/productSpecificPage.html";
  });
}
