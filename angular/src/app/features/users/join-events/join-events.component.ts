import { Component, ElementRef, inject, OnInit, Signal, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { EventsModel } from '../../../core/models/events.model';
import { EventsTabelComponent } from '../../../core/components/events-tabel/events-tabel.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { UtilityService } from '../../../core/services/utility.service';
import { EventModelComponent } from '../../../shared/components/event-model/event-model.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventApiService } from '../../../core/services/API\'s/event-api.service';
import { HttpResponseModel } from '../../../core/models/core.model';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { UserModel } from '../../../core/models/user.model';
import { LocalStorageKeys } from '../../../core/enums/core.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-events',
  standalone: true,
  imports: [EventsTabelComponent, EventModelComponent],
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
      error: (err) => {this.isLoading.set(false);}
    })
  }

}
