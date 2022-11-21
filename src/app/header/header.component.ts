import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignService } from '../sign/sign.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private signService: SignService,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    this.headerService.getProfile()
      .then((data: any) => {
        this.user = data;
      })
      .catch((error: any) => {
        console.log(error);
        this.logout();
      })
      .finally(() => {
      });
  }

  logout(): void {
    this.signService.removeToken();
    this.router.navigate(['/sign']);
  }
}
