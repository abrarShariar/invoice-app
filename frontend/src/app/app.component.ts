import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      
      constructor(private authService:AuthService){}

      ngOnInit(){}

      isLoggedIn(){
        return this.authService.isLoggedIn();
      }

}
