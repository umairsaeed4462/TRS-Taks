import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private afAuth: AngularFireAuth ) { }

  public async sendVerificationEmail(email: string): Promise<boolean> {

    return await new Promise(async (res, rej) => {
      this.afAuth.createUserWithEmailAndPassword(email, email).then( async(userCredential)=>{
        await userCredential.user?.sendEmailVerification();
        res(true)
      }).catch((e:FirebaseError)=>{
        rej(e);
      });
      
    })

  }

  public async isEmailVerified(): Promise<any> {
    return new Promise(async (res, rej) => {
     
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          user.reload().then(() => {
            res(user)
          });
        }
      });


    });
  }

  public onSendForgetPasswordVerificationEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  public applyEmailVerificationCode(oobCode: string): Promise<void> {
    return this.afAuth.applyActionCode(oobCode)
  }

  public applyForgetPasswordResetCode(oobCode: string): Promise<string> {
    return this.afAuth.verifyPasswordResetCode(oobCode);
  }

  public onResetPasswordInFirebase(newPassword: string, oobCode: string): Promise<void> {
    return this.afAuth.confirmPasswordReset(oobCode, newPassword)
  }
}
