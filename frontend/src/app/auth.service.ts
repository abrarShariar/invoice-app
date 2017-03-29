import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private loggedIn:boolean = true;

  constructor() { }

  isLoggedIn(){
      return this.loggedIn;
  }


}
