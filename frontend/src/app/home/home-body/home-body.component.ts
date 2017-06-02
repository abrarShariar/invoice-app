import {Component, OnInit} from '@angular/core';
import {HomeService} from '../home.service';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css'],
  providers: [GeneralService]
})
export class HomeBodyComponent implements OnInit {

  constructor(private generalService: GeneralService, private homeService: HomeService) {
  }

  ngOnInit() {
    this.generalService.displaySidebar(true);
    this.wakeUpPayDateCounter();
  }

  wakeUpPayDateCounter() {
    this.homeService.buildPayDateCounter()
      .subscribe(
        (res) => {
          // console.log(res);
        },
        (err) => {
          console.log("error in buildPayDateCounter");
        }
      )
  }

}
