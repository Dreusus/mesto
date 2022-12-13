export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameSelector = nameSelector
    this._descriptionSelector = descriptionSelector
    this._avatarSelector = avatarSelector

    this._userName = document.querySelector(nameSelector)
    this._userDescription = document.querySelector(descriptionSelector)
    this._userAvatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatar
  }

}
