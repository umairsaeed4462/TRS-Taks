import { AfterViewInit, Component, effect, ElementRef, inject, input, InputSignal, OnInit, output, OutputEmitterRef, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { InputComponent } from '../../../core/components/input/input.component';
import { EventForm, EventsModel } from '../../../core/models/events.model';
import { UtilityService } from '../../../core/services/utility.service';
import { pastDateValidator } from '../../../core/validators/past-date-not-alllow';

@Component({
  selector: 'app-event-model',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './event-model.component.html',
  styleUrl: './event-model.component.scss'
})
export class EventModelComponent implements AfterViewInit {

  public eventDetail: InputSignal<EventsModel | null> = input<EventsModel | null>(null);
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isEdit: WritableSignal<boolean> = signal<boolean>(false);
  public eventForm: FormGroup<EventForm> = new FormGroup<EventForm>({
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, pastDateValidator()])
  });

  public onSave: OutputEmitterRef<EventsModel> = output<EventsModel>();

  private utilitySer: UtilityService = inject(UtilityService);

  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  public constructor() {
    effect(() => {
      if (this.eventDetail()) {
        this.updateView();
      }
    })
  }

  public ngAfterViewInit(): void {
    this.eventForm.get('date')?.setValue(this.utilitySer.formatDateString((new Date()).toISOString()));
  }

  public updateView(): void {
    setTimeout(() => {
      this.isEdit.set(true);
      this.eventForm.patchValue({
        title: this.eventDetail()!.title,
        location: this.eventDetail()!.location,
        description: this.eventDetail()!.description,
        date: this.utilitySer.formatDateString(this.eventDetail()!.date),
      });
    }, 200);
  }

  public onAddEvent(): void {
    this.onSave.emit(this.eventForm.value as EventsModel);
  }

  public onCloseModel(): void {
    (this.closeBtn()?.nativeElement as HTMLButtonElement).click();
  }

}
