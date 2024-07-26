import Popup from "./Popup.js";

export default class DeleteConfirmation extends Popup {
  constructor(popupSelector, deleteCardForm, handleDeleteCard) {
    super({ popupSelector });
    this._handleDeleteCard = handleDeleteCard;
    this._deleteCardForm = deleteCardForm;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteCardForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(this._card);
      super.close();
    });
  }
}
