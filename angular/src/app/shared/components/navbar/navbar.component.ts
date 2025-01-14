import { Component, inject } from '@angular/core';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public utilitySer: UtilityService = inject(UtilityService);
}
