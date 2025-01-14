import { Component, inject, signal, WritableSignal } from '@angular/core';
import { EventsModel } from '../../../core/models/events.model';
import { EventsTabelComponent } from '../../../core/components/events-tabel/events-tabel.component';
import { EventApiService } from '../../../core/services/API\'s/event-api.service';
import { HttpResponseModel } from '../../../core/models/core.model';
@Component({

  selector: 'app-events',
  standalone: true,
  imports: [EventsTabelComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public eventList: WritableSignal<EventsModel[]> = signal<EventsModel[]>([]);

  private eventSer: EventApiService = inject(EventApiService);
  public ngOnInit(): void {
    this.fetchActiveEvents();
  }

  public fetchActiveEvents(): void {
    this.isLoading.set(true);
    this.eventSer.getAllEvents().subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.eventList.set(res.data);
      },
      error: (err) => { this.isLoading.set(false); }
    })
  }
}
