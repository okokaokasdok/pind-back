import { getData } from "./api-interactors.js";
import {
  renderGames,
  renderUsersList,
  renderCategoriesList
} from "./dom-creators.js";
import { addCategoriesEditModeListeners } from "./categories-edit-mode.js";
import { addGamesEditModeListeners } from "./games-edit-mode.js";
import { addUsersEditModeListeners } from "./users-edit-mode.js";
import {
  addGameFormListeners,
  addCategoryFormListeners,
  addUserFormListeners,
  addDeleteGameListeners,
  addDeleteCategoryListeners,
  addDeleteUsersListeners
} from "./requests.js";

export let gamesState = [];
export let usersState = [];
export let categoriesState = [];

export async function reload(blockName) {
  switch (blockName) {
    case "games":
      loadGamesBlock();
      break;
    case "users":
      loadUsersBlock();
      break;
    case "categories":
      loadCategoriesBlock();
      break;
    default:
      console.log("Unknown block name");
      break;
  }
}

(async function init() {
  await loadGamesBlock();
  await loadCategoriesBlock();
  await loadUsersBlock();
})();

async function loadGamesBlock() {
  gamesState = await getData("/api/games");
  if (!document.querySelector(".games-list")) return;
  document.querySelector(".games-list").innerHTML = "";
  renderGames(gamesState);
  addGamesEditModeListeners();
  addGameFormListeners();
  await addDeleteGameListeners();
}

async function loadUsersBlock() {
  usersState = await getData("/api/users");
  if (!document.querySelector(".users-list")) return;
  document.querySelector(".users-list").innerHTML = "";
  renderUsersList(usersState);
  addUsersEditModeListeners();
  await addUserFormListeners();
  await addDeleteUsersListeners();
}

async function loadCategoriesBlock() {
  categoriesState = await getData("/api/categories");
  if (!document.querySelector(".categories-list")) return;
  document.querySelector(".categories-list").innerHTML = "";
  renderCategoriesList(categoriesState);
  addCategoriesEditModeListeners();
  await addCategoryFormListeners();
  await addDeleteCategoryListeners();
}

function validateGameForm(form) {
  const title = form.querySelector('input[name="title"]').value.trim();
  const description = form.querySelector('textarea[name="description"]').value.trim();
  const developer = form.querySelector('input[name="developer"]').value.trim();
  const image = form.querySelector('input[name="image"]').value.trim();
  const link = form.querySelector('input[name="link"]').value.trim();

  if (!title || !description || !developer || !image || !link) {
    alert("Все поля должны быть заполнены");
    return false;
  }
  return true;
}

function addGameFormListeners() {
  const form = document.querySelector('.form--game');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateGameForm(form)) {
    }
  });
}
