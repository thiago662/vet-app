import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignService } from 'src/app/sign/sign.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalViewService {
  environment = environment;

  constructor(
    private http: HttpClient,
    private signService: SignService,
  ) { }

  createAnimal(params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.post(this.environment.baseUrl + 'api/animals', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  updateAnimal(id: number, params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.put(this.environment.baseUrl + 'api/animals/' + id, params, {
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

  showAnimal(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/animals/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  createMessage(params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.post(this.environment.baseUrl + 'api/messages', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  updateMessage(id: number, params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.put(this.environment.baseUrl + 'api/messages/' + id, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  deleteMessage(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.delete(this.environment.baseUrl + 'api/messages/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  showMessage(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/messages/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  createSchedule(params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.post(this.environment.baseUrl + 'api/schedules', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  updateSchedule(id: number, params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.put(this.environment.baseUrl + 'api/schedules/' + id, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  deleteSchedule(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.delete(this.environment.baseUrl + 'api/schedules/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  showSchedule(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/schedules/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  finishSchedule(id: number, params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.put(this.environment.baseUrl + 'api/schedules/finish/' + id, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  showOwnersOptions(params: any = null) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/owners/option', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
      params: params,
    }).toPromise();
  }

  showUsersOptions(params: any = null) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/users/option', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
      params: params,
    }).toPromise();
  }
}
