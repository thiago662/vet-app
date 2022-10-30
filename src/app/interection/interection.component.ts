import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterectionService } from './interection.service';

@Component({
  selector: 'app-interection',
  templateUrl: './interection.component.html',
  styleUrls: ['./interection.component.scss']
})
export class InterectionComponent implements OnInit {
  @ViewChild("contentCreate") contentCreate: any;
  @ViewChild("contentDelete") contentDelete: any;

  isCollapsed = true;
  perPageOptions = [5,10,15,20,25,30];
  interections: any;

  interectionForm = new FormGroup({
    // name: new FormControl('',[Validators.required]),
    // email: new FormControl('',[
    //   Validators.required,
    //   Validators.email,
    // ]),
    // password: new FormControl('',[
    //   Validators.required,
    //   Validators.minLength(6),
    // ]),
    // password_confirmation: new FormControl('',[
    //   Validators.required,
    //   Validators.minLength(6),
    // ]),
    // role_id: new FormControl('',[Validators.required]),
    // active: new FormControl(true),
  });
  interectionOptionsForm = new FormGroup({
    per_page: new FormControl(15),
    page: new FormControl(1),
  });
  interectionFiltersForm = new FormGroup({
    // name: new FormControl(''),
    // email: new FormControl(''),
    // role_id: new FormControl(''),
    // active: new FormControl(''),
  });

  constructor(
    private interectionService: InterectionService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  getInterections() {
    var filter = Object.assign(this.interectionOptionsForm.value, this.interectionFiltersForm.value);

    this.interectionService.getInterections(filter)
      .then((data: any) => {
        this.interections = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteInterection(id: any) {
    this.interectionService.deleteInterection(id)
      .then((data: any) => {
        this.reload();
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  onSubmitToCreate(): void {
    this.interectionService.createInterection(this.interectionForm.value)
      .then((data: any) => {
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        this.interectionForm.patchValue({
          id: '',
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role_id: '',
          active: true,
        });

        this.reload();
      });
  }

  onSubmitToFilter() {
    this.getInterections();
  }

  openCreateInterectionModal() {
    this.modalService.open(this.contentCreate, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteInterectionModal(interection: any) {
    this.modalService.open(this.contentDelete, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteInterection(interection.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  clearFilter() {
    this.interectionFiltersForm.patchValue({
      name: '',
      email: '',
      role_id: '',
      active: '',
    });
    this.onSubmitToFilter();
    this.isCollapsed = true;
  }

  reload() {
    this.ngOnInit();
  }
}
