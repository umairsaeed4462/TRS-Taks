import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-dashbaord-card',
  standalone: true,
  imports: [],
  templateUrl: './dashbaord-card.component.html',
  styleUrl: './dashbaord-card.component.scss'
})
export class DashbaordCardComponent {

  public title: InputSignal<string> = input.required<string>();
  public value: InputSignal<string> = input.required<string>();
  

}
