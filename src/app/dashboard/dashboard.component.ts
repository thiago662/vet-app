import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  perPageOptions = [5,10,15,20,25,30];
  dashboard: any;
  interections: any;

  interectionOptionsForm = new FormGroup({
    per_page: new FormControl(15),
    page: new FormControl(1),
  });

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDahsboard();
    this.getInterections();
  }

  getDahsboard() {
    this.dashboardService.getDahsboard()
      .then((data: any) => {
        this.dashboard = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  getInterections() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const fullDate = [year, month, day].join('-');

    var filter = Object.assign(this.interectionOptionsForm.value, {
      schedule_at: fullDate,
    });

    this.dashboardService.getInterections(filter)
      .then((data: any) => {
        this.interections = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }
}
