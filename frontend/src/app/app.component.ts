import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login(username, password) {
    if (username == 'admin' && password == 'admin') {
      this.authService.setLogin(true);
      localStorage.setItem('csbd-username', 'admin');
      localStorage.setItem('csbd-password', 'admin');
      location.reload()
    } else {
      this.authService.setLogin(false);
      localStorage.setItem('csbd-username', '');
      localStorage.setItem('csbd-password', '');
    }
  }


}
