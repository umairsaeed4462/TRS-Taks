import { Component, input, InputSignal } from '@angular/core';
import { ButtonTypes } from '../../types/core.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  
  public title: InputSignal<string> = input.required<string>();
  public size: InputSignal<'sm' | 'lg'> = input<'sm' | 'lg'>('lg');
  public disable: InputSignal<boolean> = input<boolean>(false);
  public isLoading: InputSignal<boolean> = input<boolean>(false);
  public type: InputSignal<ButtonTypes> = input<ButtonTypes>('button');
}
