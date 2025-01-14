import { Component, inject, input, InputSignal, model, ModelSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { EventsModel } from '../../models/events.model';
import { EVENTS_COLUMNS } from '../../consts/consts';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { LocalstorageService } from '../../services/localstorage.service';
import { EventApiService } from '../../services/API\'s/event-api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponseModel } from '../../models/core.model';
import { EventModelComponent } from '../../../shared/components/event-model/event-model.component';
import { UserModel } from '../../models/user.model';
import { LocalStorageKeys } from '../../enums/core.enum';

@Component({
  selector: 'app-events-tabel',
  standalone: true,
  imports: [DataTableModule, ReactiveFormsModule, ButtonComponent, EventModelComponent],
  templateUrl: './events-tabel.component.html',
  styleUrl: './events-tabel.component.scss'
})
export class EventsTabelComponent implements OnInit {

  public cols: WritableSignal<Array<colDef>> = signal<Array<colDef>>(EVENTS_COLUMNS);
  public rows: InputSignal<Array<EventsModel>> = input.required<Array<EventsModel>>();
  public isJoin: InputSignal<boolean> = input<boolean>(false);
  public isLoading: ModelSignal<boolean> = model<boolean>(false);
  public isSubLoading: WritableSignal<boolean> = signal<boolean>(false);
  public searchValue: WritableSignal<string> = signal<string>('');
  public selectedEvent: WritableSignal<EventsModel | null> = signal<EventsModel | null>(null);
  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public searchField: FormControl = new FormControl();

  private localSer: LocalstorageService = inject(LocalstorageService);
  private eventSer: EventApiService = inject(EventApiService);
  private toastSer: ToastrService = inject(ToastrService);

  public onUpdate: OutputEmitterRef<void> = output<void>();


  public ngOnInit(): void {
    this.searchField.valueChanges.subscribe((value: string) => {
      this.searchValue.set(value);
    });
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

  public onDeleteEvent(): void {
    if(!this.selectedEvent()) return;
    this.isSubLoading.set(true);
    this.eventSer.deleteEvent(this.selectedEvent()!._id).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        this.toastSer.success(res.message);
        this.onUpdate.emit();
      },
      error: () => {this.isSubLoading.set(false);}
    })
    
    
  }
  public onJoinEvent(event: EventsModel): void {
    this.isSubLoading.set(true);
    this.eventSer.joinEvent({eventID: event._id, userID: this.userInfo()!._id}).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        this.toastSer.success(res.message);
        this.onUpdate.emit();
      },
      error: () => { this.isSubLoading.set(false); }
    })
    
  }
  public onEditEvent(event: EventsModel): void {
    event._id = this.selectedEvent()!._id;
    event.attendees = this.selectedEvent()!.attendees;
    event.user = this.selectedEvent()!.user;
    this.isLoading.set(true);
    this.eventSer.updateEvent(event).subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.toastSer.success(res.message);
        this.onUpdate.emit();
      },
      error: () => { this.isLoading.set(false); }
    })
  }



}
