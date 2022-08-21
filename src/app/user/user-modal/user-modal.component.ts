import { Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModalService } from './user-modal.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements AfterContentInit {
  showModal = false;
  userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role_id: new FormControl(''),
    active: new FormControl(true),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userModalService: UserModalService,
  ) { }

  ngAfterContentInit() {
    this.showModal = true;
    this.showUser(this.route.snapshot.params['id']);
  }

  onSubmitToCreate(): void {
    this.userModalService.updateUser(this.userForm.value)
      .then((data: any) => {
        this.userForm.reset();
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  onClose() {
    this.showModal = false;
    setTimeout(
      () => this.router.navigate(['..']),
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
          password: data.password,
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
}
