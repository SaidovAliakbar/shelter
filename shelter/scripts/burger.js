let burger = document.querySelector(".burger");
let burgerMenu = document.querySelector(".burger_menu");
let overlay = document.querySelector('.overlay')

burger.addEventListener("click", (event) => {
  event.stopPropagation();
  burgerMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    burgerMenu.classList.contains("active") &&
    !event.target.closest(".burger_menu") ||
    event.target.closest('.burger__item')
  ) {
    burgerMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
});
