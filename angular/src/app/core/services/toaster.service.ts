import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  public showToaster (): void {
    console.log('Toaster displayed');
    // Implement toaster functionality here
  }
}
