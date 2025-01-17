import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpResponseModel } from '../../models/core.model';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService extends BaseApiService {
  
  private readonly module: string = 'category';

  public getAllCategories(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}`, this.httpOptions);
  }

  public getCategoryById(categoryID: string): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}/${categoryID}`, this.httpOptions);
  }

  public createCategory(payload: Category): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}`, payload, this.httpOptions);
  }

  public updateCategory(categoryID: string, payload: Category): Observable<HttpResponseModel> {
    return this.http.put<HttpResponseModel>(`${this.apiURL}/${this.module}/${categoryID}`, payload, this.httpOptions);
  }

  public deleteCategory(categoryID: string): Observable<HttpResponseModel> {
    return this.http.delete<HttpResponseModel>(`${this.apiURL}/${this.module}/${categoryID}`, this.httpOptions);
  }
}
