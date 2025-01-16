import { Component, ElementRef, inject, OnInit, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../core/components/input/input.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { DEFAULT_ROLE_ID, USER_COLUMNS } from '../../core/consts/consts';
import { SignUPForm, UserModel } from '../../core/models/user.model';
import { AuthApiService } from '../../core/services/API\'s/auth-api.service';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { UtilityService } from '../../core/services/utility.service';
import { HttpResponseModel } from '../../core/models/core.model';
import { LocalStorageKeys } from '../../core/enums/core.enum';
import { RoleApiService } from '../../core/services/API\'s/role-api.service';
import { Role } from '../../core/models/role.model';

@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, DataTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class RolePermissionComponent implements OnInit {

  public cols: WritableSignal<Array<colDef>> = signal<Array<colDef>>(USER_COLUMNS);
  public rows: WritableSignal<Array<UserModel>> = signal<Array<UserModel>>([]);
  public roleList: WritableSignal<Role[]> = signal<Role[]>([]);
  public searchValue: WritableSignal<string> = signal<string>('');
  public selectedRole: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public searchField: FormControl = new FormControl();

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isSubLoading: WritableSignal<boolean> = signal<boolean>(false);
  public userForm: FormGroup<SignUPForm> = new FormGroup<SignUPForm>({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('1122'),
    cPassword: new FormControl('1122'),
    role: new FormControl(DEFAULT_ROLE_ID),
    
  });

  private apiSer: AuthApiService = inject(AuthApiService);
  private toaster: ToastrService = inject(ToastrService);
  private localSer: LocalstorageService = inject(LocalstorageService);
  private utilitySer: UtilityService = inject(UtilityService);
  private roleSer: RoleApiService = inject(RoleApiService);

  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  public ngOnInit(): void {
    this.fetchUsers();
    this.getUserInfo();
    this.fetchAllRoles();
    this.searchField.valueChanges.subscribe((value: string) => {
      this.searchValue.set(value);
    });
  }

  private fetchAllRoles(): void {
    this.roleSer.getAllRole().subscribe((res: HttpResponseModel)=>{
      this.roleList.set((res.data as Array<Role>));
    })
  }

  private fetchUsers(): void {
    this.isLoading.set(true);
    this.apiSer.getUser().subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.rows.set((res.data as Array<UserModel>));
      }, error: () => { this.isLoading.set(false); }
    })
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

  public onAddRole(): void {
    this.isSubLoading.set(true);
    this.apiSer.onSignUp(this.userForm.value as any).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        this.toaster.success("Role added successfully");
        (this.closeBtn()?.nativeElement as HTMLButtonElement).click();
        this.userForm.reset();
        this.fetchUsers();
      }, error: () => { this.isSubLoading.set(false); }
    })
  }

  public onUserDetails(user: UserModel) : void {
    this.utilitySer.navigateToWithData('users/details', user);
  }



}
