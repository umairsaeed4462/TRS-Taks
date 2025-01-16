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
  public updateUser(user: UserModel): Observable<HttpResponseModel> {
    return this.http.put<HttpResponseModel>(`${this.apiURL}/${this.module}/update/${user._id}`, user, this.httpOptions);
  }

  public deleteUser(userID: string): Observable<HttpResponseModel> {
    return this.http.delete<HttpResponseModel>(`${this.apiURL}/${this.module}/deleteUser/${userID}`, this.httpOptions);
  }

  public getUser(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}`, this.httpOptions);
  }
  public onLogin(payload: { username: string, password: string }): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}/login`, payload, this.httpOptions);
  }
  
  public onSignUp(payload: UserModel): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}/register`, payload, this.httpOptions);
  }
}
