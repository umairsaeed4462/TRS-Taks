import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { Role } from '../../core/models/role.model';
import { UserModel } from '../../core/models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ROLE_COLUMNS, USER_COLUMNS } from '../../core/consts/consts';
import { ButtonComponent } from '../../core/components/button/button.component';
import { RoleApiService } from '../../core/services/API\'s/role-api.service';
import { HttpResponseModel } from '../../core/models/core.model';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../core/enums/core.enum';
import { UtilityService } from '../../core/services/utility.service';

@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, DataTableModule],
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.scss'
})
export class RolePermissionsComponent implements OnInit {

  public cols: WritableSignal<Array<colDef>> = signal<Array<colDef>>(ROLE_COLUMNS);
  public rows: WritableSignal<Array<Role>> = signal<Array<Role>>([]);
  public roleList: WritableSignal<Role[]> = signal<Role[]>([]);
  public searchValue: WritableSignal<string> = signal<string>('');
  public selectedRole: WritableSignal<Role | null> = signal<Role | null>(null);
  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public searchField: FormControl = new FormControl();

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isSubLoading: WritableSignal<boolean> = signal<boolean>(false);

  private roleSer: RoleApiService = inject(RoleApiService);
  private localSer: LocalstorageService = inject(LocalstorageService);
  public utilitySer: UtilityService = inject(UtilityService);

  public ngOnInit(): void {
    this.fetchRole();
    this.getUserInfo();
  }

  private fetchRole(): void {
    this.isSubLoading.set(true);
    this.roleSer.getAllRole().subscribe({
      next: (res: HttpResponseModel) => {
        this.rows.set(res.data);
        this.isSubLoading.set(false);
      },
      error: () => {
        this.isSubLoading.set(false);
      }
    });
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

}
