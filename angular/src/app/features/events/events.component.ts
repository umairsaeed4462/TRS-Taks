import { Component, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { EventsTabelComponent } from '../../core/components/events-tabel/events-tabel.component';
import { EventsModel } from '../../core/models/events.model';
import { EventApiService } from '../../core/services/API\'s/event-api.service';
import { HttpResponseModel } from '../../core/models/core.model';
import { EventModelComponent } from '../../shared/components/event-model/event-model.component';
import { UserModel } from '../../core/models/user.model';
import { UtilityService } from '../../core/services/utility.service';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageKeys } from '../../core/enums/core.enum';
@Component({

  selector: 'app-events',
  standalone: true,
  imports: [EventsTabelComponent, EventModelComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public eventList: WritableSignal<EventsModel[]> = signal<EventsModel[]>([]);
  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  private utilitySer: UtilityService = inject(UtilityService);
  private localSer: LocalstorageService = inject(LocalstorageService);
  private eventSer: EventApiService = inject(EventApiService);
  private toastSer: ToastrService = inject(ToastrService);

  public eventModel: Signal<EventModelComponent | undefined> = viewChild<EventModelComponent>(EventModelComponent);

  public ngOnInit(): void {
    this.fetchEvents();
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

  public fetchEvents(): void {
    this.isLoading.set(true);
    this.eventSer.getAllEvents().subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.eventList.set(res.data);
      },
      error: (err) => { this.isLoading.set(false); }
    })
  }

  public onAddEvent(event: EventsModel): void {

    const user: UserModel | null = this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN);
    if (!user) return;
    event.user = user._id!;
    event.status = 'pending';
    this.isLoading.set(true);
    this.eventSer.createNewEvent(event).subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.fetchEvents();
        this.toastSer.success(res.message);
        this.eventModel()?.onCloseModel();
        this.eventModel()?.eventForm.reset();
      }, error: () => { this.isLoading.set(false); }
    })

  }
}
