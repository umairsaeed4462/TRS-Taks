import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { HttpResponseModel } from '../../models/core.model';
import { Role } from '../../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService extends BaseApiService {

  private readonly module: string = 'role';
  public getAllRoleDetails(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}/details`, this.httpOptions);
  }
  public getAllRole(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}`, this.httpOptions);
  }
  public createRole(payload: Role): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}/create`, payload, this.httpOptions);
  }
  public updateRole(roleID: string, payload: Role): Observable<HttpResponseModel> {
    return this.http.put<HttpResponseModel>(`${this.apiURL}/${this.module}/${roleID}`, payload, this.httpOptions);
  }
  public deleteRole(roleID: string): Observable<HttpResponseModel> {
    return this.http.delete<HttpResponseModel>(`${this.apiURL}/${this.module}/${roleID}`, this.httpOptions);
  }
}
