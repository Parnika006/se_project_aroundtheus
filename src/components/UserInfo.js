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
    this._profileTitle.textContent = userInfoData.name;
    this._profileDescription.textContent = userInfoData.about;
  }

  setUserProfileImage(link) {
    this._profileImageSelector.src = link;
  }
}
