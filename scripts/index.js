const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
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
const closeButtons = document.querySelectorAll(".modal__close-button");

// functions

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", (e) => showPreviewImage(cardData, e));

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  checkModalForClick();
  document.addEventListener("keydown", checkModalForEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", checkModalForEscape);
}

function renderCards(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCards({ name, link }, cardListEl);
  closePopup(addNewCardModal);
  e.target.reset();
}

function showPreviewImage({ name, link }, e) {
  e.stopPropagation();
  openModal(cardImageModal);
  imageElement.src = link;
  imageElement.alt = name;
  cardImageCaption.textContent = name;
}

profileEditButton.addEventListener("click", (e) => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  e.stopPropagation();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", (e) => {
  e.stopPropagation();
  openModal(addNewCardModal);
});

initialCards.forEach((cardData) => renderCards(cardData, cardListEl));

function checkModalForClick() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closePopup(modal);
      } else if (evt.target.classList.contains("modal__close-button")) {
        closePopup(modal);
      }
    });
  });
}

function checkModalForEscape(event) {
  const modal = document.querySelector(".modal_opened");
  if (isModalOpen() && event.key === "Escape") {
    closePopup(modal);
  }
}

function isModalOpen() {
  const modalOpened = document.querySelector(".modal_opened");
  if (modalOpened === null) {
    return false;
  }
  return modalOpened.classList.contains("modal_opened");
}

function isClickOutsideModal(event) {
  const modalOpened = document.querySelector(".modal_opened");
  const modalContainer = modalOpened.querySelector(".js-modal__container");
  if (modalContainer === null) {
    return true;
  }
  return !modalContainer.contains(event.target);
}
