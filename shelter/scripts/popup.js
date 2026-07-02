import { pets } from "./pagination.js";

let allPets = [...pets];

const container = document.querySelector(".pet_card_container");
const dialog = document.getElementById("dialog");

container.addEventListener("click", (event) => {
  const card = event.target.closest(".pet_card");

  if (!card) return;

  const id = card.dataset.id;

  console.log(id);

  dialog.showModal();

  dialog.querySelector("h2").textContent = allPets[id].name;
  dialog.querySelector("img").src = allPets[id].img;
  dialog.querySelector("h3").textContent =
    `${allPets[id].type} - ${allPets[id].breed};`;
  dialog.querySelector("p").textContent = allPets[id].description;
  dialog.querySelector(".age").textContent = `Age: ${allPets[id].age}`;
  dialog.querySelector(".inoculations").textContent =
    `Inoculations: ${allPets[id].inoculations}`;
  dialog.querySelector(".diseases").textContent =
    `Diseases: ${allPets[id].diseases}`;
  dialog.querySelector(".parasites").textContent =
    `Parasites: ${allPets[id].parasites}`;

  dialog.querySelector(".age").innerHTML =
    `<strong>Age:</strong> ${allPets[id].age}`;

  dialog.querySelector(".inoculations").innerHTML =
    `<strong>Inoculations:</strong> ${allPets[id].inoculations}`;

  dialog.querySelector(".diseases").innerHTML =
    `<strong>Diseases:</strong> ${allPets[id].diseases}`;

  dialog.querySelector(".parasites").innerHTML =
    `<strong>Parasites:</strong> ${allPets[id].parasites}`;
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
  }

  if(e.target === dialog.querySelector('.close_btn')) {
    dialog.close()
  }
});
