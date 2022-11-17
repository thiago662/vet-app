import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimalService } from './animal.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  @ViewChild("contentCreate") contentCreate: any;
  @ViewChild("contentDelete") contentDelete: any;

  isCollapsed = true;
  perPageOptions = [5,10,15,20,25,30];
  animals: any;
  owners: any;

  animalForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    species: new FormControl('',[Validators.required]),
    breed: new FormControl('',[Validators.required]),
    sex: new FormControl('',[Validators.required]),
    birth_date: new FormControl('',[Validators.required]),
    active: new FormControl(true),
    owners: new FormArray([
      new FormGroup({
        owner_id: new FormControl(''),
      }),
    ]),
  });
  get ownerForms(): FormArray {
    return this.animalForm.get('owners') as FormArray;
  }
  animalOptionsForm = new FormGroup({
    per_page: new FormControl(15),
    page: new FormControl(1),
  });
  animalFiltersForm = new FormGroup({
    name: new FormControl(''),
    species: new FormControl(''),
    breed: new FormControl(''),
    // birth_date: new FormControl(''),
    active: new FormControl(''),
  });

  constructor(
    private animalService: AnimalService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAnimals();
    // this.getRoleOptions();
    this.animalOptionsForm.valueChanges.subscribe(value => {
      this.getAnimals();
    });
  }

  getAnimals() {
    var filter = Object.assign(this.animalOptionsForm.value, this.animalFiltersForm.value);

    this.animalService.getAnimals(filter)
      .then((data: any) => {
        this.animals = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteAnimal(id: any) {
    this.animalService.deleteAnimal(id)
      .then((data: any) => {
        this.reload();
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  showOwnersOptions() {
    this.animalService.showOwnersOptions()
      .then((data: any) => {
        this.owners = data;
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

  onSubmitToCreate(): void {
    this.animalService.createAnimal(this.animalForm.value)
      .then((data: any) => {
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        this.animalForm.patchValue({
          // id: '',
          name: '',
          species: '',
          breed: '',
          sex: '',
          birth_date: '',
          active: true,
        });

        this.reload();
      });
  }

  onSubmitToFilter() {
    this.getAnimals();
  }

  openCreateAnimalModal() {
    this.showOwnersOptions();
    // this.animalsOwnerOwns = 0;
    this.modalService.open(this.contentCreate, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteAnimalModal(animal: any) {
    this.modalService.open(this.contentDelete, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteAnimal(animal.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  clearFilter() {
    this.animalFiltersForm.patchValue({
      name: '',
      species: '',
      breed: '',
      sex: '',
      active: '',
    });
    this.onSubmitToFilter();
    this.isCollapsed = true;
  }

  reload() {
    this.ngOnInit();
  }
}
