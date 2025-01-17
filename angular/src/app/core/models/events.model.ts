import { FormControl } from "@angular/forms";
import { UserModel } from "./user.model"
import { Category } from "./category.model";

export interface EventsModel {
    _id: string,
    title: string,
    description: string,
    date: string,
    location: string,
    user: UserModel | string | any,
    status: 'pending' | 'approved',
    attendees: UserModel[],
    category?: Category
}
export interface EventForm {
    title: FormControl<string | null>
    description: FormControl<string | null>
    date: FormControl<string | null>
    location: FormControl<string | null>
    category: FormControl<string | null>
}