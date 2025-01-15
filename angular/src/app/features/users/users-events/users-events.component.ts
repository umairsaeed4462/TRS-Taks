import { Component, ElementRef, inject, OnInit, Signal, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { EventsModel } from '../../../core/models/events.model';
import { EventsTabelComponent } from '../../../core/components/events-tabel/events-tabel.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { UtilityService } from '../../../core/services/utility.service';
import { EventModelComponent } from '../../../shared/components/event-model/event-model.component';
import { EventApiService } from '../../../core/services/API\'s/event-api.service';
import { HttpResponseModel } from '../../../core/models/core.model';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { UserModel } from '../../../core/models/user.model';
import { LocalStorageKeys } from '../../../core/enums/core.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-events',
  standalone: true,
  imports: [EventsTabelComponent, EventModelComponent],
  templateUrl: './users-events.component.html',
  styleUrls: ['./users-events.component.scss']
})
export class UsersEventsComponent implements OnInit {

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public eventList: WritableSignal<EventsModel[]> = signal<EventsModel[]>([]);

  private utilitySer: UtilityService = inject(UtilityService);
  private localSer: LocalstorageService = inject(LocalstorageService);
  private eventSer: EventApiService = inject(EventApiService);
  private toastSer: ToastrService = inject(ToastrService);

  public eventModel: Signal<EventModelComponent | undefined> = viewChild<EventModelComponent>(EventModelComponent);

  public ngOnInit(): void {
    this.fetchUserEvents();
  }

  public fetchUserEvents(): void {
    const user: UserModel | null = this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN);
    if (!user) return;
    this.isLoading.set(true);
    this.eventSer.getUsersEvents(user._id!).subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.eventList.set(res.data);
      },
      error: (err) => {this.isLoading.set(false);}
    })
  }

  public onAddEvent(event: EventsModel): void {

    const user: UserModel | null = this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN);
    if (!user) return;
    event.user = user._id!;
    event.status = 'pending';
    event.attendees = [];
    this.isLoading.set(true);
    this.eventSer.createNewEvent(event).subscribe({
      next: (res: HttpResponseModel) =>{
        this.isLoading.set(false);
        this.fetchUserEvents();
        this.toastSer.success(res.message);
        this.eventModel()?.onCloseModel();
      }, error: ()=>{ this.isLoading.set(false);}
    })
    
  } 

}
