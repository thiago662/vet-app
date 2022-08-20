import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignService } from '../sign/sign.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  environment = environment;

  constructor(
    private http: HttpClient,
    private signService: SignService,
  ) { }

  getUsers(options: any = null, params: any = null) {
    console.log(typeof options);
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/users', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
      params: options,
    }).toPromise();
  }

  createUser(params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.post(this.environment.baseUrl + 'api/users', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  showUser(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/users/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }
}
