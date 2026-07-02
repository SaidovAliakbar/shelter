import { getPets } from "./api.js";

const template = document.querySelector(".pet_card_template");
const container = document.querySelector(".pet_card_container");

const firstBtn = document.querySelector(".first");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const lastBtn = document.querySelector(".last");

const currentPageBtn = document.querySelector(".current_btn");

const pets = await getPets();

let currentPage = 0;

function getPageSize() {
  if (window.innerWidth >= 1280) return 8;

  if (window.innerWidth >= 768) return 6;

  return 3;
}

function create48Cards(cards) {
   let result = [];

  for (let i = 0; i < 6; i++) {
    result.push(...cards);
  }

  console.log("Cards created");

  return result;
}

let allPets = create48Cards(pets)

function renderPage(pets) {
  const start = (currentPage - 1) * getPageSize();
  const end = start + getPageSize();
  
  return pets.slice(start, end);
}

function changeCardsOrder (cards, direction) {
  if (direction === 'next') {
    cards.push(cards.shift())
  }
  if (direction === 'prev') {
    cards.unshift(cards.pop())
  }
}

function renderCards (cardsToRender) {
  cardsToRender.forEach(card => {
    const cardElement = template.content.cloneNode(true)

    cardElement.querySelector("img").src = card.img;
    cardElement.querySelector("img").alt = card.name;
    cardElement.querySelector("p").textContent = card.name;
    
    cardElement.querySelector("p").dataset.id = card.id;

    container.appendChild(cardElement);
  })

  console.log("Cards rendered");
}

function updateButtons() {
  const lastPage = Math.ceil(allPets.length / getPageSize());

  firstBtn.classList.toggle("disabled", currentPage === 1);
  prevBtn.classList.toggle("disabled", currentPage === 1);

  nextBtn.classList.toggle("disabled", currentPage === lastPage);
  lastBtn.classList.toggle("disabled", currentPage === lastPage);
}

function waitTransition(element) {
  return new Promise(resolve => {
    element.addEventListener("transitionend", resolve, { once: true });
  });
}

async function updatePage() {
  container.classList.add("fade");
  await waitTransition(container);

  container.innerHTML = "";

  currentPageBtn.textContent = currentPage;

  renderCards(renderPage(allPets));

  updateButtons();

  container.classList.remove("fade");
}

let currentPageSize = getPageSize();

window.addEventListener('resize', () => {
  const newPageSize = getPageSize();

  if (newPageSize !== currentPageSize) {
    currentPageSize = newPageSize;

    const lastPage = Math.ceil(allPets.length / newPageSize);

    if (currentPage > lastPage) {
      currentPage = lastPage;
    }

    updatePage();
  }
})

currentPage = 1;

updatePage();

nextBtn.addEventListener("click", () => {
  const lastPage = Math.ceil(allPets.length / getPageSize());
  
  changeCardsOrder(allPets, 'next')

  if (currentPage < lastPage) {
    currentPage++;
    updatePage();
  }
});

prevBtn.addEventListener("click", () => {
  changeCardsOrder(allPets, 'prev')

  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
});

firstBtn.addEventListener("click", () => {
  currentPage = 1;
  updatePage();
});

lastBtn.addEventListener("click", () => {
  currentPage = Math.ceil(allPets.length / getPageSize());
  updatePage();
});