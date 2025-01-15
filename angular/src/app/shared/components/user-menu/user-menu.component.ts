import { Component, inject, signal, WritableSignal } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { UtilityService } from '../../../core/services/utility.service';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../../core/enums/core.enum';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
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
