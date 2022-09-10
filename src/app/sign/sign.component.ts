import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from './auth.model';
import { SignService } from './sign.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent {
  email: string = '';
  password: string = '';

  constructor(
    private signService: SignService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    var isUserLogged = this.signService.isUserLogged();

    if (isUserLogged) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    this.signService.authorization(this.email, this.password)
      .then((data: auth) => {
        console.log(data);
        this.signService.setToken(data);
        this.router.navigate(['/dashboard']);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }
}
