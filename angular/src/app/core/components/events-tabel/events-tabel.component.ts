import { Component, ElementRef, inject, input, InputSignal, model, ModelSignal, OnInit, output, OutputEmitterRef, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { EventsModel } from '../../models/events.model';
import { EVENTS_COLUMNS } from '../../consts/consts';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { LocalstorageService } from '../../services/localstorage.service';
import { EventModelComponent } from '../../../shared/components/event-model/event-model.component';
import { UserModel } from '../../models/user.model';
import { LocalStorageKeys } from '../../enums/core.enum';
import { DatePipe } from '@angular/common';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-events-tabel',
  standalone: true,
  imports: [DataTableModule, ReactiveFormsModule, ButtonComponent, DatePipe],
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
  public utilitySer: UtilityService = inject(UtilityService);

  public onUpdate: OutputEmitterRef<void> = output<void>();

  public eventModel: Signal<EventModelComponent | undefined> = viewChild<EventModelComponent>(EventModelComponent);
  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('deleteModel');

  public ngOnInit(): void {
    this.searchField.valueChanges.subscribe((value: string) => {
      this.searchValue.set(value);
    });
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }


}
