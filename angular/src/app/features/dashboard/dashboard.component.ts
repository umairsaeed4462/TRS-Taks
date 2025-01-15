import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DashbaordCardComponent } from '../../shared/components/dashbaord-card/dashbaord-card.component';
import { DashboardModel, HttpResponseModel } from '../../core/models/core.model';
import { EventApiService } from '../../core/services/API\'s/event-api.service';
import { UserModel } from '../../core/models/user.model';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { LocalStorageKeys } from '../../core/enums/core.enum';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashbaordCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public userInfo: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public reportData: WritableSignal<DashboardModel> = signal<DashboardModel>({
    totalEvents: '0',
    totalApprovedEvents: '0',
    totalPendingEvents: '0',
    totalUsers: '0',
    totalAttendees: '0'
  });

  private localSer: LocalstorageService = inject(LocalstorageService);

  private eventSer: EventApiService = inject(EventApiService);
  public ngOnInit(): void {
    this.getUserInfo();
  }

  private async getUserInfo(): Promise<void> {
    this.userInfo.set(await this.localSer.getItem<UserModel>(LocalStorageKeys.USER_LOGIN));
    this.fetchDashboardReport();
  }

  public fetchDashboardReport(): void {
    if(this.userInfo()?.role == 'admin') {
      this.eventSer.dashboardReport().subscribe({
        next: (res: HttpResponseModel) => {
          this.reportData.set(res.data);
        }
      })
      return;
    }

    this.eventSer.dashboardReport(this.userInfo()?._id).subscribe({
      next: (res: HttpResponseModel) => {
        this.reportData.set(res.data);
      }
    })
    
    
  }

  public onExportData(): void {
      const doc = new jsPDF();
  
      // Add title to the PDF
      doc.text("Report", 14, 10);
  
      // Define the table headers and data
      const headers = ["Total Events", "Pending Events", "Approved Events", "Total Event Joining"];
      const data = [
        [this.reportData().totalEvents, this.reportData().totalPendingEvents, this.reportData().totalApprovedEvents, this.reportData().totalAttendees]
      ];
  
      // Add the table to the PDF
      (doc as any).autoTable({
        head: [headers],
        body: data,
        startY: 15,
        theme: 'grid',
        
      });
  
      // Save the PDF
      doc.save(`Report-${Date.now()}.pdf`);
    }

}
