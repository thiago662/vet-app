import { Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModalService } from './user-modal.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements AfterContentInit {
  showModal = false;
  roles: any;

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password');
    let confirmPassword = group.get('password_confirmation');

    return (
        password?.value === confirmPassword?.value &&
        password?.value.length >= 6 &&
        confirmPassword?.value.length >= 6
      ) || (
        password?.value == '' &&
        confirmPassword?.value == ''
      )
      ? null
      : { notSame: true }
  };

  userForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    role_id: new FormControl('',[Validators.required]),
    active: new FormControl(true),
  }, { validators: this.checkPasswords });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userModalService: UserModalService,
  ) { }

  ngAfterContentInit() {
    this.showModal = true;
    this.getRoleOptions();
    this.showUser(this.route.snapshot.params['id']);
  }

  onSubmitToCreate(): void {
    this.userModalService.updateUser(this.userForm.value?.id, this.userForm.value)
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
      });
  }

  onClose() {
    this.showModal = false;
    setTimeout(
      () => this.router.navigate(['users']),
      100
    );
  }

  onDialogClick(event: UIEvent) {
    event.stopPropagation();
    event.cancelBubble = true;
  }

  showUser(id: any) {
    this.userModalService.showUser(id)
      .then((data: any) => {
        this.userForm.patchValue({
          id: data.id,
          name: data.name,
          email: data.email,
          role_id: data.role_id,
          active: data.active,
        });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  getRoleOptions() {
    this.userModalService.getRoleOptions()
      .then((data: any) => {
        this.roles = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }
}
