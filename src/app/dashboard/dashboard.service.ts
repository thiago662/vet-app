import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignService } from '../sign/sign.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  environment = environment;

  constructor(
    private http: HttpClient,
    private signService: SignService,
  ) { }

  getDahsboard(params: any = null) {
    var authorization: any = this.signService.getToken();

    return this.http.get(this.environment.baseUrl + 'api/dahsboard', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authorization.access_token,
      }),
      params: params,
    }).toPromise();
  }

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
}
