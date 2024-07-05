import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".preview_image-modal"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__picture-caption"
    );
  }
  open(data) {
    this._previewImage.alt = data._name;
    this._previewImageTitle.textContent = data._name;
    this._previewImage.src = data._link;
    super.open();
  }
}
