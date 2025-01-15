import { Component, ElementRef, inject, OnInit, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { SignUPForm, UserModel } from '../../../../core/models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { AuthApiService } from '../../../../core/services/API\'s/auth-api.service';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../core/services/utility.service';

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
  
  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  public deleteModel: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('deleteModel');

  public constructor() {
    this.userInfo.set(history.state.data);
  }

  public ngOnInit(): void {
    this.userForm.get('role')?.valueChanges.subscribe((value) => {
      if (value === 'admin') {
        this.userForm.get('permissions')?.patchValue({
          create: true,
          delete: true,
          update: true,
          join: true
        });
        this.userForm.controls['permissions']?.disable();
      } else {
        this.userForm.controls['permissions']?.enable();
        this.userForm.get('permissions')?.patchValue({
          create: true,
          delete: false,
          update: true,
          join: true
        })
      }
    });
  }

  public onUpdateClick(): void {
    this.userForm.patchValue(this.userInfo()!);
  }

  public onUpdateRole(): void {
    this.userForm.controls['permissions']?.enable();
    const payload: UserModel = {...this.userForm.value as UserModel};
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

  public onDeleteRole(): void {
    this.isSubLoading.set(true);
    this.apiSer.deleteUser(this.userInfo()!._id!).subscribe({
      next: (res: any) => {
        this.isSubLoading.set(false);
        (this.deleteModel()?.nativeElement as HTMLButtonElement).click();
        this.toaster.success(res.message);
        history.go(-1);
      },
      error: (err) => {
        this.isSubLoading.set(false);
      }
    })
  }

}
