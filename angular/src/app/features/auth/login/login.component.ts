import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm, UserModel } from '../../../core/models/user.model';
import { AuthApiService } from '../../../core/services/API\'s/auth-api.service';
import { UtilityService } from '../../../core/services/utility.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponseModel } from '../../../core/models/core.model';
import { LocalStorageKeys } from '../../../core/enums/core.enum';
import { LocalstorageService } from '../../../core/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private apiSer: AuthApiService = inject(AuthApiService);
  private utilitySer: UtilityService = inject(UtilityService);
  private toastSer: ToastrService = inject(ToastrService);
  private localSer: LocalstorageService = inject(LocalstorageService);
  public onLogin(): void {
    this.isLoading.set(true);
    this.apiSer.onLogin({username: this.loginForm.value.username!, password: this.loginForm.value.password!}).subscribe({
      next: (res: HttpResponseModel) => {
        this.isLoading.set(false);
        const user: UserModel = { ...res.data.user, token: res.data.token };
        this.localSer.setItem(LocalStorageKeys.USER_LOGIN, user);
        this.toastSer.success('Login Successfully');
        this.loginForm.reset();
        this.utilitySer.navigateTo('/', true);
      },
      error: () => {this.isLoading.set(false);}
    })
  }
}
