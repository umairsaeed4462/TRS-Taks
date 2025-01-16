import { Component, inject, input, InputSignal } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

export interface Options{
  _id: string;
  label: string;
}

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss',
  viewProviders: [
      {
        provide: ControlContainer,
        useExisting: ControlContainer,
        useFactory: () => inject(ControlContainer, { skipSelf: true })
      }
    ]
})
export class SelectOptionComponent {
  
  public controlName: InputSignal<string> = input.required<string>();
  public options: InputSignal<Options[]> = input.required<Options[]>();
  public label: InputSignal<string | undefined> = input<string>();
  public required: InputSignal<boolean> = input<boolean>(true);

  private parentContainer: ControlContainer = inject(ControlContainer);
    
  
    public ngOnInit(): void {
      const validationList: ((control: AbstractControl) => ValidationErrors | null)[] = [];
      if (this.required()) {
        validationList.push(Validators.required);
      }
  
      this.parentFormGroup.addControl(this.controlName(), new FormControl('', validationList));
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
