export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, profileImageSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileImageSelector = document.querySelector(profileImageSelector);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(userInfoData) {
    this._profileTitle.innerHTML = userInfoData.name;
    this._profileDescription.innerHTML = userInfoData.about;
  }

  setUserProfileImage(link) {
    this._profileImageSelector.src = link;
  }
}
