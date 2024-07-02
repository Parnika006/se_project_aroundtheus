export default class Section {
  constructor({ items, renderer }, cardElementSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardElementSelector = document.querySelector(cardElementSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardElementSelector.prepend(element);
  }
}
