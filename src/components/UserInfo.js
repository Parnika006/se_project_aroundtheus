export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._profileTitle.textContent = title;
    this._profileDescription.textContent = description;
  }
}
