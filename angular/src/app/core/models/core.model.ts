import { HttpStatusCode } from "@angular/common/http";

export interface HttpResponseModel {
    data: any;
    message: string;
    status: HttpStatusCode;
}