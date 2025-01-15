import { Component, ElementRef, inject, OnInit, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../core/components/input/input.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { SignUPForm, UserModel } from '../../../core/models/user.model';
import { AuthApiService } from '../../../core/services/API\'s/auth-api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponseModel } from '../../../core/models/core.model';
import { colDef, DataTableModule } from '@bhplugin/ng-datatable';
import { EVENTS_COLUMNS, USER_COLUMNS } from '../../../core/consts/consts';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../../core/enums/core.enum';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, DataTableModule],
  templateUrl: './role-permission.component.html',
  styleUrl: './role-permission.component.scss'
})
export class RolePermissionComponent implements OnInit {

  public cols: WritableSignal<Array<colDef>> = signal<Array<colDef>>(USER_COLUMNS);
  public rows: WritableSignal<Array<UserModel>> = signal<Array<UserModel>>([]);
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
    role: new FormControl('user'),
    permissions: new FormGroup({
      create: new FormControl(true),
      delete: new FormControl(false),
      update: new FormControl(true),
      join: new FormControl(true)
    }),
  });

  private apiSer: AuthApiService = inject(AuthApiService);
  private toaster: ToastrService = inject(ToastrService);
  private localSer: LocalstorageService = inject(LocalstorageService);
  private utilitySer: UtilityService = inject(UtilityService);

  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');


  public ngOnInit(): void {
    this.fetchRole();
    this.getUserInfo();
    this.userForm.get('role')?.valueChanges.subscribe((value) => {
      if (value === 'admin') {
        this.userForm.get('permissions')?.patchValue({
          create: true,
          delete: true,
          update: true,
          join: true
        });
      } else {
        this.userForm.get('permissions')?.patchValue({
          create: true,
          delete: false,
          update: true,
          join: true
        })
      }
    })
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
  }

  public onAddRole(): void {
    this.isSubLoading.set(true);
    this.apiSer.onSignUp(this.userForm.value as UserModel).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        this.toaster.success("Role added successfully");
        (this.closeBtn()?.nativeElement as HTMLButtonElement).click();
        this.userForm.reset();
        this.fetchRole();
      }, error: () => { this.isSubLoading.set(false); }
    })
  }

  private fetchRole(): void {
    this.isLoading.set(true);
    this.apiSer.getUser().subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.rows.set((res.data as Array<UserModel>).filter( item => item._id != this.userInfo()?._id));
      }, error: () => { this.isLoading.set(false); }
    })
  }

  public onUserDetails(user: UserModel) : void {
    this.utilitySer.navigateToWithData('admin/role-permissions/role-details', user);
  }



}
