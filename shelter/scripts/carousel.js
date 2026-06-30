import { getPets } from "./api.js";

const template = document.querySelector("#pet-card-template");
const container = document.querySelector(".our_friends__slider__cards");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const allPets = await getPets();
const SLIDE_DURATION = 500;

let track;
let currentGroup = [];
let isAnimating = false;
let groupSize = getGroupSize();

function getGroupSize() {
  if (window.innerWidth >= 1280) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1; 
}

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function getRandomGroup(exclude = []) {
  const excludeNames = new Set(exclude.map((pet) => pet.name));
  const available = allPets.filter((pet) => !excludeNames.has(pet.name));

  return shuffle(available).slice(0, groupSize);
}

function createCard(pet) {
  const card = template.content.cloneNode(true);

  card.querySelector(".pet_card__img").src = pet.img;
  card.querySelector(".pet_card__img").alt = pet.name;
  card.querySelector(".pet_card__name").textContent = pet.name;

  return card;
}

function createGroupElement(pets) {
  const group = document.createElement("div");
  group.className = "card_group";

  pets.forEach((pet) => {
    group.appendChild(createCard(pet));
  });

  return group;
}

function createTrack() {
  const newTrack = document.createElement("div");
  newTrack.className = "carousel__track";
  return newTrack;
}

function initCarousel() {
  container.innerHTML = "";
  track = createTrack();
  currentGroup = getRandomGroup();
  track.appendChild(createGroupElement(currentGroup));
  container.appendChild(track);
}

function resetTrack(nextGroup) {
  track.style.transition = "none";
  track.style.transform = "translateX(0)";
  track.innerHTML = "";
  track.appendChild(createGroupElement(nextGroup));
  currentGroup = nextGroup;
  isAnimating = false;
}

function slide(direction) {
  if (isAnimating) return;

  const nextGroup = getRandomGroup(currentGroup);
  const nextGroupEl = createGroupElement(nextGroup);
  const slideWidth = container.offsetWidth;

  isAnimating = true;

  if (direction === "next") {
    track.appendChild(nextGroupEl);
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.offsetHeight;
    track.style.transition = `transform ${SLIDE_DURATION}ms ease`;
    track.style.transform = `translateX(-${slideWidth}px)`;
  } else {
    track.insertBefore(nextGroupEl, track.firstChild);
    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth}px)`;
    track.offsetHeight;
    track.style.transition = `transform ${SLIDE_DURATION}ms ease`;
    track.style.transform = "translateX(0)";
  }

  track.addEventListener(
    "transitionend",
    () => {
      resetTrack(nextGroup);
    },
    { once: true },
  );
}

initCarousel();

prevBtn.addEventListener("click", () => slide("prev"));
nextBtn.addEventListener("click", () => slide("next"));

window.addEventListener("resize", () => {
  const newGroupSize = getGroupSize();

  if (newGroupSize !== groupSize && !isAnimating) {
    groupSize = newGroupSize;
    initCarousel();
  }
});
