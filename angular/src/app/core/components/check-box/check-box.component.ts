import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputTypes } from '../../types/core.types';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class CheckBoxComponent {
  public controlName: InputSignal<string> = input.required<string>();
  public title: InputSignal<string> = input<string>('');

  private parentContainer: ControlContainer = inject(ControlContainer);


  public ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlName(), new FormControl(false));
  }

  public ngAfterViewInit(): void {
    
  }

  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public get fc(): AbstractControl<any, any> {
    return (this.parentContainer.control as FormGroup).controls[this.controlName()];
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName());
  }
}
