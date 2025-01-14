import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DashbaordCardComponent } from '../../shared/components/dashbaord-card/dashbaord-card.component';
import { DashboardModel, HttpResponseModel } from '../../core/models/core.model';
import { EventApiService } from '../../core/services/API\'s/event-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashbaordCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public reportData: WritableSignal<DashboardModel> = signal<DashboardModel>({
    totalEvents: '0',
    totalApprovedEvents: '0',
    totalPendingEvents: '0',
    totalUsers: '0',
    totalAttendees: '0'
  });
  
  private eventSer: EventApiService = inject(EventApiService);
   public ngOnInit(): void {
    this.fetchDashboardReport();
   }

   public fetchDashboardReport(): void {
       this.eventSer.dashboardReport().subscribe({
         next: (res: HttpResponseModel) => {
           this.reportData.set(res.data);
         }
       })
     }

}
