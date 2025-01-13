import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputTypes } from '../../types/core.types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class InputComponent {

  public controlName: InputSignal<string> = input.required<string>();
  public type: InputSignal<InputTypes> = input<InputTypes>('text');
  public isLoading: InputSignal<boolean> = input<boolean>(false);
  public label: InputSignal<string | undefined> = input<string>();
  public placeholder: InputSignal<string> = input<string>('');
  public isTextArea: InputSignal<boolean> = input<boolean>(false, { alias: 'textarea' });
  public value: InputSignal<string> = input<string>('', { alias: 'defaultValue' });
  public required: InputSignal<boolean> = input<boolean>(true);
  public disable: InputSignal<boolean> = input<boolean>(false);
  public isNumber: InputSignal<boolean> = input<boolean>(false);

  public errorMessage: WritableSignal<string> = signal<string>('');
  public hide: WritableSignal<boolean> = signal<boolean>(true);

  private parentContainer: ControlContainer = inject(ControlContainer);
  

  public ngOnInit(): void {
    const validationList: ((control: AbstractControl) => ValidationErrors | null)[] = [];
    if (this.required()) {
      validationList.push(Validators.required);
    }

    if (this.type() == 'email') {
      validationList.push(Validators.email);
    }

    this.parentFormGroup.addControl(this.controlName(), new FormControl(this.value(), validationList));
  }

  public ngAfterViewInit(): void {
    if(this.type() == 'date') {
      this.fc.setValue(new Date())
    }
  }

  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public get fc(): AbstractControl<any, any> {
    return (this.parentContainer.control as FormGroup).controls[this.controlName()];
  }

  public updateErrorMessage(): void {
    if (this.fc.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.fc.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  public onTogglePassword(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName());
  }

}
