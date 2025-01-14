import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { HttpResponseModel } from '../../models/core.model';
import { EventsModel } from '../../models/events.model';

@Injectable({
  providedIn: 'root'
})
export class EventApiService extends BaseApiService {
  
  private readonly module: string = 'events';
  public dashboardReport(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}/dashboardReport`, this.httpOptions);
  }
  public getAllEvents(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}`, this.httpOptions);
  }
  public getAllActiveEvents(): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}/getAllActiveEvents`, this.httpOptions);
  }
  public getUsersEvents(userID: string): Observable<HttpResponseModel> {
    return this.http.get<HttpResponseModel>(`${this.apiURL}/${this.module}/eventsByUserID/${userID}`, this.httpOptions);
  }

  public createNewEvent(event: EventsModel): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}/create`, event, this.httpOptions);
  }
  public joinEvent(payload: {eventID: string, userID: string}): Observable<HttpResponseModel> {
    return this.http.post<HttpResponseModel>(`${this.apiURL}/${this.module}/join`, payload, this.httpOptions);
  }

  public updateEvent(event: EventsModel): Observable<HttpResponseModel> {
    return this.http.put<HttpResponseModel>(`${this.apiURL}/${this.module}/updateEvent/${event._id}`, event, this.httpOptions);
  }

  public deleteEvent(eventID: string): Observable<HttpResponseModel> {
    return this.http.delete<HttpResponseModel>(`${this.apiURL}/${this.module}/deleteEvent/${eventID}`, this.httpOptions);
  }
  public approvedEvent(eventID: string): Observable<HttpResponseModel> {
    return this.http.patch<HttpResponseModel>(`${this.apiURL}/${this.module}/approved/${eventID}`, this.httpOptions);
  }
  
}
