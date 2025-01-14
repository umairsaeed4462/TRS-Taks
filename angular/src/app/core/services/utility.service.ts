import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../enums/core.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private router: Router = inject(Router);
  private modalService: NgbModal = inject(NgbModal);

  public navigateTo(link: string, replaceUrl: boolean = false): void {
    this.router.navigate([`/${link}`], { replaceUrl: replaceUrl });
  }

  public navigateToWithData(link: string, data: any, replaceUrl: boolean = false): void {
    this.router.navigate([`/${link}`], { state: { data }, replaceUrl: replaceUrl });
  }

  public openModel(component: any) {
    this.modalService.open(component)
  }

  public closeModel () {
    this.modalService.dismissAll();
  }

  public onLogout(): void {
    localStorage.removeItem(LocalStorageKeys.USER_LOGIN);
    this.router.navigate(['/auth']);
  }
}
