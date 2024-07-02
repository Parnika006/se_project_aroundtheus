import { initialCards, validationSettings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardListEl = document.querySelector(".cards__list");

const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = document.forms["add-card-form"];
const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-url-input");
const cardImageModal = document.querySelector("#card-image");

const cardImageCaption = cardImageModal.querySelector(
  ".modal__picture-caption"
);
const imageElement = document.querySelector(".preview_image-modal");
const cardSelector = "#card-template";

/* validation */

const profileEditForm = document.forms["profile-form"];

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

/* function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", checkModalForEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", checkModalForEscape);
} */

function renderCard(data, wrapper) {
  const card = new Card(data, cardSelector, showPreviewImage);

  section.addItem(card.getView());
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

section.renderItems();

const popupWithImage = new PopupWithImage(".preview_image-modal");
popupWithImage.setEventListeners();

const newCardForm = new PopupWithForm(
  "#add-card-form",
  handleAddCardFormSubmit
);
console.log(newCardForm);
newCardForm.setEventListeners();

const editCardForm = new PopupWithForm(
  "#profile-form",
  handleProfileEditSubmit
);
editCardForm.setEventListeners();

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  editCardForm.close();
}

function handleAddCardFormSubmit(cardData) {
  renderCard({ name: cardData.title, link: cardData.Url }, cardListEl);
  addCardFormElement.reset();
  newCardForm.close();
}

function showPreviewImage(data) {
  popupWithImage.open(data);
}

profileEditButton.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();
  profileTitleInput.value = cardData.title;
  profileDescriptionInput.value = cardData.description;
  e.stopPropagation();
  editCardForm.open();
});

addNewCardButton.addEventListener("click", () => newCardForm.open());

/* function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addNewCardModal);
  e.target.reset();
  addFormValidator.disableButton();
}

function showPreviewImage(card) {
  openModal(cardImageModal);
  imageElement.src = card._link;
  imageElement.alt = card._name;
  cardImageCaption.textContent = card._name;
}

profileEditButton.addEventListener("click", (e) => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  e.stopPropagation();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    } else if (evt.target.classList.contains("modal__close-button")) {
      closePopup(modal);
    }
  });
});  */

/* function checkModalForEscape(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    if (modal) {
      closePopup(modal);
    }
  } 
}*/
