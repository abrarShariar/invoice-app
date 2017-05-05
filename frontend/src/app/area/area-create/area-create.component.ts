import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AreaService} from '../area.service';
import {Area} from '../area';

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.css']
})
export class AreaCreateComponent implements OnInit {

  showSuccess: boolean = false;
  showError: boolean = false;
  public areaCreateForm: FormGroup;
  public areas: Area[] = [];
  editMode: boolean = false;
  createMode: boolean = false;
  private id: any;

  constructor(private areaService: AreaService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
    this.getAllArea();
  }

  buildForm() {
    this.areaCreateForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submitCreateAreaForm() {
    this.showError = false;
    this.showSuccess = false;
    let data = {
      id: this.id,
      name: this.areaCreateForm.value.name,
      status: true
    }

    if (!this.editMode) {
      this.areaService.createArea(data)
        .subscribe(
          (res) => {
            if (res.status) {
              this.getAllArea();
              this.showSuccess = true;
              this.areaCreateForm.reset();
            } else {
              this.showError = true;
            }
          },
          (err) => {
            console.log("ERROR from createArea");
            this.showError = true;
          }
        )
    } else {
      this.areaService.updateArea(data)
        .subscribe(
          (res) => {
            // console.log(res);
            this.getAllArea();
            this.areaCreateForm.reset();
            this.editMode = false;
          },
          (err) => {

          }
        )
    }


  }


  getAllArea() {
    this.areaService.getAllArea()
      .subscribe(
        (res) => {
          this.areas = res;
        },
        (err) => {
          console.log(err);
        }
      )
  }

  statusChanged(event: any) {
    this.getAllArea();
  }

  cancelEdit() {
    this.editMode = false;
    this.createMode = false;
    this.areaCreateForm.reset();
    this.getAllArea();
  }


  showEditForm(event) {
    this.editMode = true;
    this.createMode = false;
    this.id = event;
    this.areaService.getAreaById(event)
      .subscribe(
        (res) => {
          this.areaCreateForm.patchValue({
            name: [res.name]
          });
        },
        (err) => {

        }
      )
  }

  createModeOn(){
    this.editMode = false;
    this.createMode = true;
    this.areaCreateForm.reset();
  }


}
