import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private rootUrl = environment.api;
  private httpOptions: any;

  constructor(
    private http: HttpClient
    ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': environment.apikey })
    };
  }

  loginUser(form: any) {
    const formValues = form;
    return this.http.post(this.rootUrl + 'user/login', formValues, this.httpOptions);
  }

  getAllUserData(form: any) {
    const formValues = form;
    return this.http.post(this.rootUrl + 'user/getalluser', formValues, this.httpOptions);
  }
}
