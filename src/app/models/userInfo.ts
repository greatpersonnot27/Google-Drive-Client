export class UserInfo {
  FirstName: string;
  Email: string;
  LastName: string;

  constructor (userInfo: gapi.auth2.BasicProfile) {
    this.FirstName = userInfo.getName();
    this.LastName = userInfo.getFamilyName();
    this.Email = userInfo.getEmail();
  }

  get Name(): string {
    return this.FirstName;
  }

  get Surname(): string {
    return this.LastName;
  }

  get EmailAddress(): string {
    return this.Email
  }
}
