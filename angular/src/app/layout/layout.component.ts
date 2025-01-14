import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { UserModel } from '../core/models/user.model';
import { LocalstorageService } from '../core/services/localstorage.service';
import { LocalStorageKeys } from '../core/enums/core.enum';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  private localSer: LocalstorageService = inject(LocalstorageService);

  public ngOnInit(): void {
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

}
