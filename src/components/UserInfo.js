export default class UserInfo {
  constructor ( { nameSelector, descriptionSelector}) {
  this._nameSelector = nameSelector
  this._descriptionSelector = descriptionSelector

  this._userName = document.querySelector(nameSelector)
  this._userDescription = document.querySelector(descriptionSelector)
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    }
  }

  setUserInfo(formName, formDescription) {
    this._userName.textContent = formName;
    this._userDescription.textContent = formDescription;
  }
}
