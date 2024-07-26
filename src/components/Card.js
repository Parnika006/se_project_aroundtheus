import { data } from "autoprefixer";

class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeCard,
    handleDeleteCardPopup
  ) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCardPopup = handleDeleteCardPopup;
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this)
    );

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCardPopup(this)
    );

    this._likeButton.addEventListener("click", () =>
      this._handleLikeCard(this)
    );
  }

  /*  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };
 */

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getView() {
    this._element = this._getTemplate(); //cloning the element
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImageEl = this._element.querySelector(".card__image");
    this._cardImageEl.src = this._link;

    this._cardImageEl.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  isLiked() {
    return this._likeButton.classList.contains("card__like-button_active");
  }

  getCardId() {
    return this._id;
  }
}

export default Card;
