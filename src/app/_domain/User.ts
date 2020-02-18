export class User {
  constructor({id, username, displayname, profileImageUrl, email, token}: {id?: string; username?: string; displayname?: string; profileImageUrl?: string; email?: string; token?: string}) {
    this.id = id;
    this.username = username;
    this.displayname = displayname;
    this.profileImageUrl = profileImageUrl;
    this.email = email;
    this.token = token;
  }

  public id: string;
  public username: string;
  public password: string;
  public email: string;
  public displayname: string;
  public profileImageUrl: string;
  public token: string;
}
