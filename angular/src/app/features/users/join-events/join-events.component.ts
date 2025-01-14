import { Component, ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { EventsModel } from '../../../core/models/events.model';
import { EventsTabelComponent } from '../../../core/components/events-tabel/events-tabel.component';
import { EventApiService } from '../../../core/services/API\'s/event-api.service';
import { HttpResponseModel } from '../../../core/models/core.model';

@Component({
  selector: 'app-join-events',
  standalone: true,
  imports: [EventsTabelComponent],
  templateUrl: './join-events.component.html',
  styleUrl: './join-events.component.scss'
})
export class JoinEventsComponent {
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public eventList: WritableSignal<EventsModel[]> = signal<EventsModel[]>([]);

  private eventSer: EventApiService = inject(EventApiService);
  public eventModel: Signal<ElementRef<any> | undefined> = viewChild<ElementRef>('eventModel')

  public ngOnInit(): void {
    this.fetchActiveEvents();
  }

  public fetchActiveEvents(): void {
    this.isLoading.set(true);
    this.eventSer.getAllActiveEvents().subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.eventList.set(res.data);
      },
      error: (err) => { this.isLoading.set(false); }
    })
  }

}
