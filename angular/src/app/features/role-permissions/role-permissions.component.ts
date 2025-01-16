import { Component, ElementRef, inject, OnInit, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { Role, RoleDetails } from '../../core/models/role.model';
import { UserModel } from '../../core/models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DEFAULT_ROLE_ID, ROLE_COLUMNS, USER_COLUMNS } from '../../core/consts/consts';
import { ButtonComponent } from '../../core/components/button/button.component';
import { RoleApiService } from '../../core/services/API\'s/role-api.service';
import { HttpResponseModel } from '../../core/models/core.model';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../core/enums/core.enum';
import { UtilityService } from '../../core/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, DataTableModule],
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.scss'
})
export class RolePermissionsComponent implements OnInit {

  public cols: WritableSignal<Array<colDef>> = signal<Array<colDef>>(ROLE_COLUMNS);
  public rows: WritableSignal<Array<RoleDetails>> = signal<Array<RoleDetails>>([]);
  public roleList: WritableSignal<RoleDetails[]> = signal<RoleDetails[]>([]);
  public defaultRoleID: WritableSignal<string> = signal<string>(DEFAULT_ROLE_ID);
  public searchValue: WritableSignal<string> = signal<string>('');
  public selectedRole: WritableSignal<RoleDetails | null> = signal<RoleDetails | null>(null);
  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public searchField: FormControl = new FormControl();

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isSubLoading: WritableSignal<boolean> = signal<boolean>(false);

  private roleSer: RoleApiService = inject(RoleApiService);
  private localSer: LocalstorageService = inject(LocalstorageService);
  public utilitySer: UtilityService = inject(UtilityService);
  private toastSer: ToastrService = inject(ToastrService);

  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  public ngOnInit(): void {
    this.fetchRole();
    this.getUserInfo();
    this.searchField.valueChanges.subscribe((value: string) => {
      this.searchValue.set(value);
    });
  }

  private fetchRole(): void {
    this.isLoading.set(true);
    this.roleSer.getAllRoleDetails().subscribe({
      next: (res: HttpResponseModel) => {
        this.rows.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

  public onDeleteRole(): void {
    if(!this.selectedRole()) return;
    
    this.isSubLoading.set(true);
    this.roleSer.deleteRole(this.selectedRole()!._id).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        (this.closeBtn()?.nativeElement as HTMLButtonElement).click();
        this.toastSer.success(res.message);
       this.fetchRole();
      },
      error: () => {
        this.isSubLoading.set(false);
      }
    });
  }

}
