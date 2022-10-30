import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild("contentCreate") contentCreate: any;
  @ViewChild("contentDelete") contentDelete: any;

  isCollapsed = true;
  perPageOptions = [5,10,15,20,25,30];
  users: any;
  roles: any;

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password');
    let confirmPassword = group.get('password_confirmation');

    return password?.value === confirmPassword?.value ? null : { notSame: true }
  };

  userForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
    ]),
    password_confirmation: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
    ]),
    role_id: new FormControl('',[Validators.required]),
    active: new FormControl(true),
  }, { validators: this.checkPasswords });
  userOptionsForm = new FormGroup({
    per_page: new FormControl(15),
    page: new FormControl(1),
  });
  userFiltersForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role_id: new FormControl(''),
    active: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoleOptions();
    this.userOptionsForm.valueChanges.subscribe(value => {
      this.getUsers();
    });
  }

  getUsers() {
    var filter = Object.assign(this.userOptionsForm.value, this.userFiltersForm.value);

    this.userService.getUsers(filter)
      .then((data: any) => {
        this.users = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id)
      .then((data: any) => {
        this.reload();
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  getRoleOptions() {
    this.userService.getRoleOptions()
      .then((data: any) => {
        this.roles = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  onSubmitToCreate(): void {
    this.userService.createUser(this.userForm.value)
      .then((data: any) => {
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        this.userForm.patchValue({
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
    this.getUsers();
  }

  openCreateUserModal() {
    this.modalService.open(this.contentCreate, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteUserModal(user: any) {
    this.modalService.open(this.contentDelete, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteUser(user.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  clearFilter() {
    this.userFiltersForm.patchValue({
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
