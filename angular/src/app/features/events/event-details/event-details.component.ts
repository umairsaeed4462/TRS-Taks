import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { EventModelComponent } from '../../../shared/components/event-model/event-model.component';
import { EventsModel } from '../../../core/models/events.model';
import { UserModel } from '../../../core/models/user.model';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { EventApiService } from '../../../core/services/API\'s/event-api.service';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../core/services/utility.service';
import { HttpResponseModel } from '../../../core/models/core.model';
import { LocalStorageKeys } from '../../../core/enums/core.enum';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, ButtonComponent, EventModelComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {

  public event: WritableSignal<EventsModel | null> = signal<EventsModel | null>(null);
  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isSubLoading: WritableSignal<boolean> = signal<boolean>(false);

  private localSer: LocalstorageService = inject(LocalstorageService);
  private eventSer: EventApiService = inject(EventApiService);
  private toastSer: ToastrService = inject(ToastrService);
  public utilitySer: UtilityService = inject(UtilityService);

  public eventModel: Signal<EventModelComponent | undefined> = viewChild<EventModelComponent>(EventModelComponent);
  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('deleteModel');
  public approvedClose: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('approvedClose');
  public joinModelClose: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('joinModel');

  public constructor() {
    this.event.set(history.state.data);
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

  public onDeleteEvent(): void {
    if (!this.event()) return;
    this.isSubLoading.set(true);
    this.eventSer.deleteEvent(this.event()!._id).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        this.toastSer.success(res.message);
        (this.closeBtn()?.nativeElement as HTMLButtonElement).click();
        history.go(-1);
      },
      error: () => { this.isSubLoading.set(false); }
    })


  }
  public onJoinEvent(): void {
    this.isSubLoading.set(true);
    this.eventSer.joinEvent({ eventID: this.event()!._id, userID: this.userInfo()!._id! }).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        (this.joinModelClose()?.nativeElement as HTMLButtonElement).click();
        this.toastSer.success(res.message);
        history.go(-1);
      },
      error: () => { this.isSubLoading.set(false); }
    })

  }
  public onEditEvent(event: EventsModel): void {
    event._id = this.event()!._id;
    event.attendees = this.event()!.attendees;
    event.user = this.event()!.user;
    this.isLoading.set(true);
    this.eventSer.updateEvent(event).subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.toastSer.success(res.message);
        history.go(-1);
        this.eventModel()?.onCloseModel();
      },
      error: () => { this.isLoading.set(false); }
    })
  }

  public isUserJoined(): boolean {
    return this.event()?.attendees.find(user => user._id == this.userInfo()?._id) ? true : false;
  }

  public onApproved(): void {
    this.isSubLoading.set(true);
    this.eventSer.approvedEvent(this.event()!._id).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        (this.approvedClose()?.nativeElement as HTMLButtonElement).click();
        this.toastSer.success(res.message);
        history.go(-1);
      },
      error: () => { this.isSubLoading.set(false); }
    })
  }
}
