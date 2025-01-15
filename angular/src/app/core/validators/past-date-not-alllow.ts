import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value).setHours(0,0,0,0);
    const currentDate = new Date().setHours(0,0,0,0);
    if (selectedDate < currentDate) {
      return { pastDate: true }; 
    }
    
    return null; 
  };
}
