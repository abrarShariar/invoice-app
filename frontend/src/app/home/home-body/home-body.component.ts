import {Component, OnInit} from '@angular/core';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit {

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.wakeUpPayDateCounter();
  }

  wakeUpPayDateCounter() {
    this.homeService.buildPayDateCounter()
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
  }

}
