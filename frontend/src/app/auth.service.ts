import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  private loggedIn: boolean = false;

  constructor() {
  }

  isLoggedIn() {
    if (localStorage.getItem('csbd-username') == 'admin' && localStorage.getItem('csbd-password') == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  setLogin(status: boolean) {
    this.loggedIn = status;
  }


}
