import { HttpStatusCode } from "@angular/common/http";

export interface HttpResponseModel {
    data: any;
    message: string;
    status: HttpStatusCode;
}

export interface DashboardModel {
    totalEvents: string;
    totalApprovedEvents: string;
    totalPendingEvents: string;
    totalUsers: string;
    totalAttendees: string;
}

export interface VerificationRequest {
    apiKey: string;
    lang: string;
    mode: string;
    oobCode: string;
}
