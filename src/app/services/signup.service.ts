import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { SessionStorageService, SessionStorage } from 'angular-web-storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private rootUrl = environment.api;
  private httpOptions: any;

  constructor(
    private http: HttpClient
    ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': environment.apikey })
    };
  }

  registerUser(form: any) {
    const formValues = form;
    return this.http.post(this.rootUrl + 'user/signup', formValues, this.httpOptions);
  }
}
