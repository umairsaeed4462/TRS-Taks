import { Component, inject, signal, WritableSignal } from '@angular/core';
import { UtilityService } from '../../../core/services/utility.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FirebaseAuthService } from '../../../core/services/firebase-auth.service';
import { HttpResponseModel, VerificationRequest } from '../../../core/models/core.model';
import { LocalStorageKeys } from '../../../core/enums/core.enum';
import { FirebaseError } from '@angular/fire/app';
import { AuthApiService } from '../../../core/services/API\'s/auth-api.service';
import { UserModel } from '../../../core/models/user.model';
import { LocalstorageService } from '../../../core/services/localstorage.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {

  public isError: WritableSignal<boolean> = signal<boolean>(false);

  private utilitySer: UtilityService = inject(UtilityService);
  private toaster: ToastrService = inject(ToastrService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private localSer: LocalstorageService = inject(LocalstorageService);
  private fireAuth: FirebaseAuthService = inject(FirebaseAuthService);
  private apiSer: AuthApiService = inject(AuthApiService);

  public ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params: any) => {
      const queryParams: VerificationRequest = params.params;
      if (queryParams.mode == 'verifyEmail' && queryParams.oobCode) {
        this.verifyEmail(queryParams);
      } else if (queryParams.mode == "resetPassword" && queryParams.oobCode) {
        
      }

    });

  }

  private async verifyEmail(queryParams: VerificationRequest): Promise<void> {
    this.fireAuth.applyEmailVerificationCode(queryParams.oobCode).then(() => {
      this.onSignup();
    }).catch((error: FirebaseError) => {
      this.isError.set(true);
    });
  }

  public onSignup(): void {
    const user: UserModel | null = this.localSer.getItem<UserModel>(LocalStorageKeys.VERIFY_EMAIL_DATA);
    if(user){
      this.apiSer.onSignUp(user).subscribe({
        next: (res: HttpResponseModel) =>{
          this.utilitySer.navigateTo('auth');
          localStorage.removeItem(LocalStorageKeys.VERIFY_EMAIL_DATA);
          this.toaster.success("Email verified successfully. Please login...");
        }, error: ()=> {this.isError.set(false);}
      })
    }else{
      this.toaster.error("Verification failed. Please try again");
      this.isError.set(true);
    }

    
    
  }

}
