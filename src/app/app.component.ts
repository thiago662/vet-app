import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignService } from './sign/sign.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crm-app';
  isUserLogged = false;
  components = [
    'Teste',
    'teste'
  ]

  constructor(
    private signService: SignService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isUserLogged = this.signService.isUserLogged();

    this.signService.isLoggedEmitter.subscribe(show => {
      this.isUserLogged = show;
    });
  }
}
