import { AfterViewInit, Component, effect, ElementRef, input, InputSignal, OnInit, output, OutputEmitterRef, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { InputComponent } from '../../../core/components/input/input.component';
import { EventForm, EventsModel } from '../../../core/models/events.model';

@Component({
  selector: 'app-event-model',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './event-model.component.html',
  styleUrl: './event-model.component.scss'
})
export class EventModelComponent {

  public eventDetail: InputSignal<EventsModel | null> = input<EventsModel | null>(null);
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isEdit: WritableSignal<boolean> = signal<boolean>(false);
  public eventForm: FormGroup<EventForm> = new FormGroup<EventForm>({
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  public onSave: OutputEmitterRef<EventsModel> = output<EventsModel>();

  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  public constructor() {
    effect(() => {
      if (this.eventDetail()) {
        this.updateView();
      }
    })
  }

  public updateView(): void {
    setTimeout(() => {
      this.isEdit.set(true);
      this.eventForm.patchValue({
        title: this.eventDetail()!.title,
        location: this.eventDetail()!.location,
        description: this.eventDetail()!.description,
        date: this.eventDetail()!.date,
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
