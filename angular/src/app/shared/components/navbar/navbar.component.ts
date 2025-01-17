import { Component, inject, signal, WritableSignal } from '@angular/core';
import { UtilityService } from '../../../core/services/utility.service';
import { UserModel } from '../../../core/models/user.model';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../../core/enums/core.enum';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  private localSer: LocalstorageService = inject(LocalstorageService);
  public utilitySer: UtilityService = inject(UtilityService);

  public ngOnInit(): void {
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }
}
