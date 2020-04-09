export class GenericError {
  public name?: string;
  public message?: string;
  public statusCode?: string;
  public stack?: string;

  constructor({name, message, statusCode, stack}: {name?: string; message?: string; statusCode?: string; stack?: string}) {
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.stack = stack;
  }
}

//{"statusCode":403,"name":"ForbiddenError","message":"Username and/or password combination incorrect"}}