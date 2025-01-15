import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      return { pastDate: true }; 
    }
    
    return null; 
  };
}
