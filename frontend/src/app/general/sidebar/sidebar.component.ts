import {Component, OnInit, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changing');
  }

}
