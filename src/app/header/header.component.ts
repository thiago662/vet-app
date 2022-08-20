import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignService } from '../sign/sign.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private signService: SignService,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.signService.removeToken();
    this.router.navigate(['/sign']);
  }
}
