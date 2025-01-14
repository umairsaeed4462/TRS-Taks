import { FormControl } from "@angular/forms";
import { UserModel } from "./user.model"

export interface EventsModel {
    _id: string,
    title: string,
    description: string,
    date: string,
    location: string,
    user: string | UserModel,
    status: 'pending' | 'approved',
    attendees: UserModel[],
}

export interface EventForm {
    title: FormControl<string | null>
    description: FormControl<string | null>
    date: FormControl<string | null>
    location: FormControl<string | null>
}