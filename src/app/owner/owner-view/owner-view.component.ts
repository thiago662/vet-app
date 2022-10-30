import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwnerViewService } from './owner-view.service';

@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.scss']
})
export class OwnerViewComponent implements OnInit {
  @ViewChild("contentCreateMessage") contentCreateMessage: any;

  owner: any;

  // ownerForm = new FormGroup({
  //   name: new FormControl('',[Validators.required]),
  //   email: new FormControl(''),
  //   person_id: new FormControl(''),
  //   phone_number: new FormControl(''),
  //   cell_phone_number: new FormControl(''),
  //   zip_code: new FormControl(''),
  //   state: new FormControl(''),
  //   city: new FormControl(''),
  //   neighborhood: new FormControl(''),
  //   street: new FormControl(''),
  //   house_number: new FormControl(''),
  //   address_reference: new FormControl(''),
  //   birth_date: new FormControl(''),
  //   active: new FormControl(true),
  //   animals: new FormArray([
  //     new FormGroup({
  //       animal_id: new FormControl(''),
  //     }),
  //   ]),
  // });
  messageForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required]),
    interection_id: new FormControl(''),
    user_id: new FormControl(''),
    owner_id: new FormControl(''),
    animal_id: new FormControl(''),

    // "id": 1,
    // "title": "criado",
    // "message": "criado",
    // "interection_id": 2,
    // "user_id": 1,
    // "owner_id": 13,
    // "animal_id": null,
    // "created_at": "2022-10-15T22:13:21.000000Z",
    // "updated_at": "2022-10-15T22:13:21.000000Z",
    // "deleted_at": null
  });

  constructor(
    private route: ActivatedRoute,
    private ownerViewService: OwnerViewService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.showOwner(this.route.snapshot.params['id']);
  }

  showOwner(id: any) {
    this.ownerViewService.showOwner(id)
      .then((data: any) => {
        this.owner = data;
        // this.userForm.patchValue({
        //   id: data.id,
        //   name: data.name,
        //   email: data.email,
        //   role_id: data.role_id,
        //   active: data.active,
        // });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  openCreateMessageModal(id: any = null) {
    if (id != null) {
      //
    }

    this.modalService.open(this.contentCreateMessage, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmitToCreateMessage(id: any = null): void {
    if (id == null) {
      this.messageForm.patchValue({
        // id: '',
        // title: '',
        // message: '',
        // interection_id: '',
        // user_id: '',
        owner_id: this.owner.id,
        // animal_id: '',
      });

      this.ownerViewService.createMessage(this.messageForm.value)
        .then((data: any) => {
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          this.messageForm.patchValue({
            id: '',
            title: '',
            message: '',
            interection_id: '',
            user_id: '',
            owner_id: '',
            animal_id: '',
          });

          this.reload();
        });
    } else {
      this.ownerViewService.updateMessage(this.messageForm.value?.id, this.messageForm.value)
        .then((data: any) => {
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          this.messageForm.patchValue({
            id: '',
            title: '',
            message: '',
            interection_id: '',
            user_id: '',
            owner_id: '',
            animal_id: '',
          });

          this.reload();
        });
    }
  }

  reload() {
    this.ngOnInit();
  }
}
