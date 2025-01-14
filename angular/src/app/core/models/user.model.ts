import { Form, FormControl } from "@angular/forms";
import { UserRole } from "../types/core.types";

export interface UserModel {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole,
    token?: string
}

export interface SignUPForm {
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    cPassword: FormControl<string | null>;
    role: FormControl<UserRole | null>
}
export interface LoginForm {
    username: FormControl<string | null>;
    password: FormControl<string | null>;
}