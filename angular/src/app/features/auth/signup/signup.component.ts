import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthApiService } from '../../../core/services/API\'s/auth-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUPForm, UserModel } from '../../../core/models/user.model';
import { HttpResponseModel } from '../../../core/models/core.model';
import { UtilityService } from '../../../core/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public signUpForm: FormGroup<SignUPForm> = new FormGroup<SignUPForm>({
    username: new FormControl('', Validators.required),
    email: new FormControl('',[ Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
    role: new FormControl('user'),
  });

  private apiSer: AuthApiService = inject(AuthApiService);
  private utilitySer: UtilityService = inject(UtilityService);
  private toastSer: ToastrService = inject(ToastrService);
  
  public onSignup(): void {
    this.isLoading.set(true);
    this.apiSer.onSignUp(this.signUpForm.value as UserModel).subscribe({
      next: (res: HttpResponseModel) =>{
        this.isLoading.set(false);
        this.utilitySer.navigateTo('auth');
        this.toastSer.success("Signup Success. Please login");
      }, error: ()=> {this.isLoading.set(false);}
    })
  }

}
