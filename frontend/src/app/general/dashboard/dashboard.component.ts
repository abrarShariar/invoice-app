import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {GeneralService} from '../general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GeneralService]
})
export class DashboardComponent implements OnInit {
  public subscription: Subscription;
  public isDisplaySideBar: boolean = true;

  constructor(private generalService: GeneralService) {
  }

  ngOnInit() {
    this.isDisplaySideBar = true;
    this.generalService.displaySidebarConfirmed$.subscribe(
      (status) => {
        this.isDisplaySideBar = status;
        console.log(status);
      }
    )
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
