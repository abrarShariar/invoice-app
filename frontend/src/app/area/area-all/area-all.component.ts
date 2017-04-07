import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { AreaService } from '../area.service';
import { Area } from '../area';

@Component({
  selector: 'app-area-all',
  templateUrl: './area-all.component.html',
  styleUrls: ['./area-all.component.css']
})
export class AreaAllComponent implements OnInit {
  @Input() areas: Area[] = [];
  @Output() statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showEditForm: EventEmitter<string> = new EventEmitter<string>();

  constructor(private areaService: AreaService) { }

  ngOnInit() {
  }

  toggleStatus(id, status) {
    let data = {
      id: id,
      status: !status
    };

    this.areaService.setStatus(data)
      .subscribe(
      (res) => {
        if (res.status) {
          this.statusChange.emit(true);
        } else {
          this.statusChange.emit(false);
        }
      },
      (err) => {
        console.log('Error in toggleStatus');
      }
      )
  }

  editArea(id) {
    this.showEditForm.emit(id);
  }


}
