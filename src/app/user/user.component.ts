import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  @ViewChild("contentEdit") contentEdit: any;
  @ViewChild("contentDelete") contentDelete: any;
  isCollapsed = true;
  perPageOptions = [10,15,20,25,30];
  users: any;
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role_id: new FormControl(''),
    active: new FormControl(true),
  });
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

  showUser(id: any) {
    this.userService.showUser(id)
      .then((data: any) => {
        console.log(data);
        // this.userForm.reset();
        // this.reload();
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
        this.userForm.reset();
        this.reload();
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  onSubmitToFilter() {
    this.getUsers();
  }

  openCreateUserModal() {
    this.modalService.open(this.contentCreate, {ariaLabelledBy: 'modal-basic-title'});
  }

  openEditUserModal(user: any) {
    this.modalService.open(this.contentEdit, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteUserModal(user: any) {
    this.modalService.open(this.contentDelete, {ariaLabelledBy: 'modal-basic-title'});
  }

  reload() {
    this.ngOnInit();
  }
}
