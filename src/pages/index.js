import { initialCards, validationSettings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = document.forms["add-card-form"];
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

function renderCard(data) {
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

const popupWithImage = new PopupWithImage("#card-image");
popupWithImage.setEventListeners();

const newCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
newCardModal.setEventListeners();

const editCardModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editCardModal.setEventListeners();

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  editCardModal.close();
}

function handleAddCardFormSubmit(cardData) {
  renderCard({ name: cardData.title, link: cardData.Url }, cardListEl);
  addCardFormElement.reset();
  newCardModal.close();
}

function showPreviewImage(data) {
  popupWithImage.open(data);
}

profileEditButton.addEventListener("click", (e) => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  editCardModal.open();
});

addNewCardButton.addEventListener("click", () => newCardModal.open());
