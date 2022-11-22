import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/toast.service';
import { OwnerService } from './owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, OnDestroy {
  @ViewChild("contentCreate") contentCreate: any;
  @ViewChild("contentDelete") contentDelete: any;

  isCollapsed = true;
  perPageOptions = [5,10,15,20,25,30];
  owners: any;
  animals: any;
  animalsOwnerOwns = 1;

  ownerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl(''),
    person_id: new FormControl(''),
    phone_number: new FormControl(''),
    cell_phone_number: new FormControl(''),
    zip_code: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    neighborhood: new FormControl(''),
    street: new FormControl(''),
    house_number: new FormControl(''),
    address_reference: new FormControl(''),
    birth_date: new FormControl(''),
    active: new FormControl(true),
    animals: new FormArray([
      new FormGroup({
        animal_id: new FormControl(''),
      }),
    ]),
  });
  get animalForms(): FormArray {
    return this.ownerForm.get('animals') as FormArray;
  }
  ownerOptionsForm = new FormGroup({
    per_page: new FormControl(15),
    page: new FormControl(1),
  });
  ownerFiltersForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    person_id: new FormControl(''),
    phone_number: new FormControl(''),
    cell_phone_number: new FormControl(''),
    zip_code: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    neighborhood: new FormControl(''),
    street: new FormControl(''),
    house_number: new FormControl(''),
    address_reference: new FormControl(''),
    birth_date: new FormControl(''),
    active: new FormControl(''),
  });

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    public toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getOwners();
    this.ownerOptionsForm.valueChanges.subscribe(value => {
      this.getOwners();
    });
  }

  getOwners() {
    var filter = Object.assign(this.ownerOptionsForm.value, this.ownerFiltersForm.value);

    this.ownerService.getOwners(filter)
      .then((data: any) => {
        this.owners = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteOwner(id: any) {
    this.ownerService.deleteOwner(id)
      .then((data: any) => {
        this.toastService.show('Dono excluido com sucesso', { classname: 'bg-success text-light', delay: 10000 });
        this.reload();
      })
      .catch((error: any) => {
        this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
        console.log(error);
      })
      .finally(() => {
      });
  }

  showAnimalsOptions() {
    this.ownerService.showAnimalsOptions()
      .then((data: any) => {
        this.animals = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  onSubmitToCreate(): void {
    this.ownerService.createOwner(this.ownerForm.value)
      .then((data: any) => {
        this.toastService.show('Dono criado com sucesso', { classname: 'bg-success text-light', delay: 10000 });
      })
      .catch((error: any) => {
        this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
        console.log(error);
      })
      .finally(() => {
        this.ownerForm.patchValue({
          // id: '',
          name: '',
          email: '',
          person_id: '',
          phone_number: '',
          cell_phone_number: '',
          zip_code: '',
          state: '',
          city: '',
          neighborhood: '',
          street: '',
          house_number: '',
          address_reference: '',
          birth_date: '',
          active: true,
        });

        this.reload();
      });
  }

  addAnimal(): void {
    this.animalForms.push(new FormGroup({
      animal_id: new FormControl(''),
    }));
  }

  removeAnimal(id: number) {
    this.animalForms.removeAt(id);
  }

  onSubmitToFilter() {
    this.getOwners();
  }

  openCreateOwnerModal() {
    this.showAnimalsOptions();
    this.animalsOwnerOwns = 0;
    this.modalService.open(this.contentCreate, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteOwnerModal(owner: any) {
    this.modalService.open(this.contentDelete, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteOwner(owner.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  clearFilter() {
    this.ownerFiltersForm.patchValue({
      // id: '',
      name: '',
      email: '',
      person_id: '',
      phone_number: '',
      cell_phone_number: '',
      zip_code: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      house_number: '',
      address_reference: '',
      birth_date: '',
      active: '',
    });
    this.onSubmitToFilter();
    this.isCollapsed = true;
  }

  reload() {
    this.ngOnInit();
  }

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
