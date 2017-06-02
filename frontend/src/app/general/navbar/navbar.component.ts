import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('csbd-username', '');
    localStorage.setItem('csbd-password', '');
    this.router.navigate(['']);
  }

  reload(){
    window.location.href = '/';
  }
}
