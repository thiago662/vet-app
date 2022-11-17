import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from './auth.model';
import { SignService } from './sign.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnDestroy {
  email: string = '';
  password: string = '';

  constructor(
    private signService: SignService,
    private router: Router,
    public toastService: ToastService,
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
        var message = error.error.message == 'The user credentials were incorrect.'
          ? 'Email ou senha incorreta.'
          : 'Erro ao fazer login.';

        this.toastService.show(message, { classname: 'bg-danger text-light', delay: 10000 });
      })
      .finally(() => {
      });
  }

	// showStandard() {
	// 	this.toastService.show('I am a standard toast');
	// }

	// showSuccess() {
	// 	this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
	// }

	// showDanger(dangerTpl: any) {
	// 	this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
	// }

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
