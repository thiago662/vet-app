import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignService } from '../sign/sign.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  environment = environment;

  constructor(
    private http: HttpClient,
    private signService: SignService,
  ) { }

  getAnimals(params: any = null) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/animals', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
      params: params,
    }).toPromise();
  }

  createAnimal(params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.post(this.environment.baseUrl + 'api/animals', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  showAnimal(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/animals/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  deleteAnimal(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.delete(this.environment.baseUrl + 'api/animals/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  showOwnersOptions() {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/owners/option', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  // getRoleOptions() {
  //   var authorization: any = this.signService.getToken();

  //   return this.http.get(this.environment.baseUrl + 'api/roles/option', {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + authorization.access_token,
  //     }),
  //   }).toPromise();
  // }
}
