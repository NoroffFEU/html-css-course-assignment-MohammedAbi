function showSidebar() {
  const sidebar = document.querySelector(".sideBar");
  sidebar.style.display = "flex";
}
function hideSideBar() {
  const sidebar = document.querySelector(".sideBar");
  sidebar.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname;
  const navbarLinks = document.querySelectorAll(".navbar a, .sideBar a");

  navbarLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");

    if (currentPage === "/" && linkPath === "/index.html") {
      link.classList.add("active");
    } else if (currentPage !== "/" && linkPath === currentPage) {
      link.classList.add("active");
    }
  });
});