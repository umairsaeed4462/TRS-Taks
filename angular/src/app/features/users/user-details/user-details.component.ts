import { Component, ElementRef, inject, OnInit, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpResponseModel } from '../../../core/models/core.model';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { InputComponent } from '../../../core/components/input/input.component';
import { SignUPForm, UserModel } from '../../../core/models/user.model';
import { DEFAULT_ROLE_ID } from '../../../core/consts/consts';
import { AuthApiService } from '../../../core/services/API\'s/auth-api.service';
import { RoleApiService } from '../../../core/services/API\'s/role-api.service';
import { Role } from '../../../core/models/role.model';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public roleList: WritableSignal<Role[]> = signal<Role[]>([]);
  public isSubLoading: WritableSignal<boolean> = signal<boolean>(false);
  public userForm: FormGroup<SignUPForm> = new FormGroup<SignUPForm>({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('1122'),
    cPassword: new FormControl('1122'),
    role: new FormControl(DEFAULT_ROLE_ID)
  });

  private apiSer: AuthApiService = inject(AuthApiService);
  private toaster: ToastrService = inject(ToastrService);
  private roleSer: RoleApiService = inject(RoleApiService);

  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  public deleteModel: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('deleteModel');

  public constructor() {
    this.userInfo.set(history.state.data);
  }

  public ngOnInit(): void {
    this.fetchAllRoles();
  }

  private fetchAllRoles(): void {
    this.roleSer.getAllRole().subscribe((res: HttpResponseModel) => {
      this.roleList.set((res.data as Array<Role>));
    })
  }

  public onUpdateClick(): void {
    this.userForm.patchValue({
      username: this.userInfo()!.username,
      email: this.userInfo()!.email,
      password: this.userInfo()!.password,
      cPassword: this.userInfo()!.password,
      role: this.userInfo()!.role._id
    })
  }

  public onUpdateUser(): void {
    const payload: UserModel = { ...this.userForm.value as any };
    payload._id = this.userInfo()?._id;
    payload.password = this.userInfo()!.password;
    this.isLoading.set(true);
    this.apiSer.updateUser(payload).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        (this.closeBtn()?.nativeElement as HTMLButtonElement).click();
        this.toaster.success(res.message);
        history.go(-1);
      },
      error: (err) => {
        this.isLoading.set(false);
      }
    })
  }

  public onDeleteUser(): void {
    this.isSubLoading.set(true);
    this.apiSer.deleteUser(this.userInfo()!._id!).subscribe({
      next: (res: HttpResponseModel) => {
        this.isSubLoading.set(false);
        (this.deleteModel()?.nativeElement as HTMLButtonElement).click();
        this.toaster.success(res.message);
        history.go(-1);
      },
      error: () => {
        this.isSubLoading.set(false);
      }
    })
  }

}
