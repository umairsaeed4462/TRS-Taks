import { Form, FormControl, FormGroup } from "@angular/forms";
import { UserRole } from "../types/core.types";

export interface UserModel {
    _id?: string;
    username: string;
    email: string;
    password: string;
    role: UserRole,
    permissions: {
        create: boolean,
        delete: boolean,
        update: boolean,
        join: boolean
    },
    token?: string
}

export interface SignUPForm {
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    cPassword: FormControl<string | null>;
    role: FormControl<UserRole | null>;
    permissions?: FormGroup
}
export interface LoginForm {
    username: FormControl<string | null>;
    password: FormControl<string | null>;
}