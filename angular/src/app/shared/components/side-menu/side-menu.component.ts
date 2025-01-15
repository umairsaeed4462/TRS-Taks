import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { UserModel } from '../../../core/models/user.model';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../../core/enums/core.enum';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, UserMenuComponent, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  
    private localSer: LocalstorageService = inject(LocalstorageService);
  
    public ngOnInit(): void {
      this.getUserInfo();
    }
  
    private async getUserInfo(): Promise<void> {
      this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
    }

}
