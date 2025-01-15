import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { HttpResponseModel } from '../../models/core.model';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService extends BaseApiService {

  private readonly module: string = 'role';
  public getAllRole(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}`, this.httpOptions);
  }
}
