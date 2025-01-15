import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUPForm, UserModel } from '../../../core/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { FirebaseAuthService } from '../../../core/services/firebase-auth.service';
import { FirebaseError } from '@angular/fire/app';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../../core/enums/core.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isVerificationEmailSend: WritableSignal<boolean> = signal<boolean>(false);
  public signUpForm: FormGroup<SignUPForm> = new FormGroup<SignUPForm>({
    username: new FormControl('', Validators.required),
    email: new FormControl('',[ Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
    role: new FormControl('user'),
  });

  private localSer: LocalstorageService = inject(LocalstorageService);
  private toastSer: ToastrService = inject(ToastrService);
  private firebaseSer: FirebaseAuthService = inject(FirebaseAuthService);

  public sendVerificationEmail(): void {

    const payload: UserModel = {
      username: this.signUpForm.value.username!,
      email: this.signUpForm.value.email!,
      password: this.signUpForm.value.password!,
      role: 'user',
      permissions: {create: true, update: true, delete: false, join: true}
    }    
    this.isLoading.set(true);
    this.firebaseSer.sendVerificationEmail(payload.email).then(()=>{
      this.isLoading.set(false);
      this.isVerificationEmailSend.set(true);
      this.toastSer.success('Verification email sent');
      this.localSer.setItem(LocalStorageKeys.VERIFY_EMAIL_DATA, payload);
      this.signUpForm.reset();
    }).catch((error: FirebaseError)=>{
      this.isLoading.set(false);
      this.toastSer.error(error.message);
    })
  }

}
