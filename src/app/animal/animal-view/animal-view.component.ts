import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimalViewService } from './animal-view.service';

@Component({
  selector: 'app-animal-view',
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.scss']
})
export class AnimalViewComponent implements OnInit {
  @ViewChild("contentUpdateAnimal") contentUpdateAnimal: any;
  @ViewChild("contentDeleteAnimal") contentDeleteAnimal: any;
  @ViewChild("contentCreateMessage") contentCreateMessage: any;
  @ViewChild("contentDeleteMessage") contentDeleteMessage: any;

  animal: any;
  owners: any;

  animalForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    species: new FormControl('',[Validators.required]),
    breed: new FormControl('',[Validators.required]),
    birth_date: new FormControl('',[Validators.required]),
    active: new FormControl(true),
    owners: new FormArray([
      // new FormGroup({
      //   owner_id: new FormControl(''),
      // }),
    ]),
  });
  get ownerForms(): FormArray {
    return this.animalForm.get('owners') as FormArray;
  }
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
    private router: Router,
    private route: ActivatedRoute,
    private animalViewService: AnimalViewService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.showAnimal(this.route.snapshot.params['id']);
  }

  showAnimal(id: any) {
    this.animalViewService.showAnimal(id)
      .then((data: any) => {
        this.animal = data;

        this.animalForm.patchValue({
          id: data.id,
          name: data.name,
          species: data.species,
          breed: data.breed,
          birth_date: data.birth_date,
          active: data.active,
        });

        data.owners.forEach((element: any) => {
          this.ownerForms.push(new FormGroup({
            owner_id: new FormControl(element.id),
          }));
        });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteAnimal(id: any) {
    this.animalViewService.deleteAnimal(id)
      .then((data: any) => {
        this.router.navigate(['/animals']);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  showOwnersOptions() {
    this.animalViewService.showOwnersOptions()
      .then((data: any) => {
        this.owners = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteMessage(id: any) {
    this.animalViewService.deleteMessage(id)
      .then((data: any) => {
        this.reload();
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  addOwner(): void {
    this.ownerForms.push(new FormGroup({
      owner_id: new FormControl(''),
    }));
  }

  removeOwner(id: number) {
    this.ownerForms.removeAt(id);
  }

  openUpdateAnimalModal() {
    this.showOwnersOptions();
    this.modalService.open(this.contentUpdateAnimal, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteAnimalModal(animal: any) {
    this.modalService.open(this.contentDeleteAnimal, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteAnimal(animal.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  openCreateMessageModal(id: any = null) {
    if (id != null) {
      this.animalViewService.showMessage(id)
        .then((data: any) => {
          this.messageForm.patchValue({
            id: data.id,
            title: data.title,
            message: data.message,
            interection_id: data.interection_id,
            user_id: data.user_id,
            owner_id: data.owner_id,
            animal_id: data.animal_id,
          });
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
        });
    } else {
      this.messageForm.patchValue({
        id: null,
        title: '',
        message: '',
        interection_id: '',
        user_id: '',
        owner_id: '',
        animal_id: '',
      });
    }

    this.modalService.open(this.contentCreateMessage, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteMessageModal(message: any) {
    this.modalService.open(this.contentDeleteMessage, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteMessage(message.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  onSubmitToUpdateAnimal(): void {
    this.animalViewService.updateAnimal(this.animalForm.value?.id, this.animalForm.value)
      .then((data: any) => {
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        this.animalForm.patchValue({
          id: '',
          name: '',
          species: '',
          breed: '',
          birth_date: '',
        });

        this.ownerForms.clear();

        this.reload();
      });
  }

  onSubmitToCreateMessage(id: any = null): void {
    if (id == null) {
      this.messageForm.patchValue({
        // id: '',
        // title: '',
        // message: '',
        // interection_id: '',
        // user_id: '',
        // owner_id: '',
        animal_id: this.animal.id,
      });

      this.animalViewService.createMessage(this.messageForm.value)
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
      this.animalViewService.updateMessage(this.messageForm.value?.id, this.messageForm.value)
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

  print(text: any) {
    var printWindow = window.open('', '', 'height=400,width=800');
    if (printWindow) {
      printWindow.open('', '', 'height=400,width=800');
      // printWindow.document.write('<html><head><title>DIV Contents</title>');
      // printWindow.document.write('</head><body >');
      printWindow.document.write(text);
      // printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  reload() {
    this.ngOnInit();
  }
}
