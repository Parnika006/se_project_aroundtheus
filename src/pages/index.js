//imports

import { validationSettings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import DeleteConfirmation from "../components/DeleteConfirmation.js";
import Api from "../components/Api.js";

// consts

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = document.forms["add-card-form"];
const cardSelector = "#card-template";
const profileImageEditButton = document.querySelector(
  ".profile__image-container"
);
const changeProfilePictureModal = document.forms["change-profile-picture-form"];
const profileImage = document.querySelector(".profile__image");
const profileEditForm = document.forms["profile-form"];
const deleteCardForm = document.forms["delete-card-form"];

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

let section;

//api instantiate

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "75623fcf-ddee-44c9-84c0-daef735bad5c",
    "Content-Type": "application/json",
  },
});

//api on page loading

api.getInitialCards().then((initialCards) => {
  console.log(initialCards);
  section = new Section(
    {
      items: initialCards,
      renderer: renderCard,
    },
    ".cards__list"
  );
  section.renderItems();
});

//to do -change name to profileinfo
api
  .getUserInfo()
  .then((profileInfo) => {
    userInfo.setUserInfo(profileInfo);
  })
  .catch((err) => {
    console.error(err);
  });

//instantiating other classes

const popupWithImage = new PopupWithImage("#card-image");

const newCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const editCardModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const deleteCardModal = new DeleteConfirmation(
  "#delete-card-confirmation",
  deleteCardForm,
  handleDeleteCard
);

const profilePictureModal = new PopupWithForm(
  "#change-profile-picture-modal",
  handleChangeProfilePictureSubmit
);

// set event listeners

popupWithImage.setEventListeners();

newCardModal.setEventListeners();

editCardModal.setEventListeners();

deleteCardModal.setEventListeners();

profilePictureModal.setEventListeners();

//button Event Listeners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  editCardModal.open();
});

profileImageEditButton.addEventListener("click", () => {
  profilePictureModal.open();
});

addNewCardButton.addEventListener("click", () => newCardModal.open());

//functions

function renderCard(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    showPreviewImage,
    handleLikeCard,
    handleDeleteCardPopup
  );
  section.addItem(card.getView());
}

function handleAddCardFormSubmit({ title, url }) {
  api.postCard({ name: title, link: url }).then((cardData) => {
    renderCard(cardData, cardListEl);
    addCardFormElement.reset();
    newCardModal.close();
  });
}

function handleDeleteCardPopup(card) {
  deleteCardModal.open(card);
}

/* function handleDeleteCard(card) {
  card._element.remove();
}
 */
function handleDeleteCard(card) {
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card._element.remove();
      deleteCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleLikeCard(card) {
  if (card.isLiked()) {
    api
      .unlikeCard(card.getCardId())
      .then(() => {
        card._likeButton.classList.remove("card__like-button_active");
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card.getCardId())
      .then(() => {
        card._likeButton.classList.add("card__like-button_active");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function showPreviewImage(data) {
  popupWithImage.open(data);
}

function handleProfileEditSubmit({ title, description }) {
  api.editUserInfo({ title, description }).then(() => {
    userInfo.setUserInfo({ title, description });
    editCardModal.close();
  });
}

function handleChangeProfilePictureSubmit({ picture_url }) {
  api.editUserProfilePicture({ link: picture_url }).then(() => {
    profileImage.src = picture_url;
    changeProfilePictureModal.reset();
    profilePictureModal.close();
  });
}

/* validation */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

const changeProfilePictureFormValidator = new FormValidator(
  validationSettings,
  changeProfilePictureModal
);

//enableValidation

addFormValidator.enableValidation();
editFormValidator.enableValidation();
changeProfilePictureFormValidator.enableValidation();
