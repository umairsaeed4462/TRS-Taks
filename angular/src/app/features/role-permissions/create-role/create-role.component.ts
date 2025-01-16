import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AfterViewInit, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputComponent } from '../../../core/components/input/input.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { CheckBoxComponent } from '../../../core/components/check-box/check-box.component';
import { RoleApiService } from '../../../core/services/API\'s/role-api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponseModel } from '../../../core/models/core.model';
import { Role } from '../../../core/models/role.model';
import { UserModel } from '../../../core/models/user.model';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../../core/enums/core.enum';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, CheckBoxComponent],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export class CreateRoleComponent implements AfterViewInit {
 
  public roleForm: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required),
    permission: new FormGroup({
      dashboard: new FormGroup({
        view: new FormControl(true),
        totalUser: new FormControl(false),
        totalPendingEvent: new FormControl(true),
        totalActiveEvent: new FormControl(true),
        totalEventJoins: new FormControl(true)
      }),
      user: new FormGroup({
        view: new FormControl(false),
        create: new FormControl(false),
        edit: new FormControl(false),
        delete: new FormControl(false),
      }),
      event: new FormGroup({
        view: new FormControl(true),
        create: new FormControl(true),
        edit: new FormControl(true),
        delete: new FormControl(false),
        approved: new FormControl(false),
        join: new FormControl(true),
      }),
      role: new FormGroup({
        view: new FormControl(false),
        create: new FormControl(false),
        edit: new FormControl(false),
        delete: new FormControl(false)
      }),
    })
  })
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public roleDetails: WritableSignal<Role | null> = signal<Role | null>(null);
 public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null); 

  private roleSer: RoleApiService = inject(RoleApiService);
  private toastSer: ToastrService = inject(ToastrService);
   private localSer: LocalstorageService = inject(LocalstorageService);
  
  public constructor() {
    this.roleDetails.set(history.state.data);
  }

  public ngOnInit(): void {
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
      this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
    }

  public ngAfterViewInit(): void {
    if(this.roleDetails()) {
      this.roleForm.patchValue(this.roleDetails()!);
    }
  }

  public onSubmit(): void {
    if(this.roleDetails()) {
      this.onEditRole();
      return;
    }

    this.isLoading.set(true);
    this.roleSer.createRole(this.roleForm.value).subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.roleForm.reset();
        this.toastSer.success(res.message);
        history.go(-1);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  public onEditRole(): void {
    this.isLoading.set(true);
    this.roleSer.updateRole(this.roleDetails()!._id, this.roleForm.value).subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        this.roleForm.reset();
        this.toastSer.success(res.message);
        history.go(-1);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
