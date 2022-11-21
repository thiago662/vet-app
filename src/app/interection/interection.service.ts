import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignService } from '../sign/sign.service';

@Injectable({
  providedIn: 'root'
})
export class InterectionService {
  environment = environment;

  constructor(
    private http: HttpClient,
    private signService: SignService,
  ) { }

  getInterections(params: any = null) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/schedules', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
      params: params,
    }).toPromise();
  }

  createInterection(params: any) {
    var authorization: any = this.signService.getToken();

    return this.http.post(this.environment.baseUrl + 'api/interections', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  showInterection(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/interections/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }

  deleteInterection(id: any) {
    var authorization: any = this.signService.getToken();

    return this.http.delete(this.environment.baseUrl + 'api/interections/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
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

  showAnimalsOptions() {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/animals/option', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
    }).toPromise();
  }
}
