import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { HttpResponseModel } from '../../models/core.model';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApiService {
  
  private readonly module: string = 'auth';
  public onLogin(payload: { username: string, password: string }): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}/login`, payload, this.httpOptions);
  }
  
  public onSignUp(payload: UserModel): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}/register`, payload, this.httpOptions);
  }
}
