import { HttpStatusCode } from "@angular/common/http";

export interface HttpResponseModel {
    data: any;
    message: string;
    status: HttpStatusCode;
}

export interface VerificationRequest {
    apiKey: string;
    lang: string;
    mode: string;
    oobCode: string;
  }
  