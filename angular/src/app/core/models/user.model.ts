import { Form, FormControl, FormGroup } from "@angular/forms";
import { UserRole } from "../types/core.types";
import { Role } from "./role.model";

export interface UserModel {
    _id?: string;
    username: string;
    email: string;
    password: string;
    role: Role,
    token?: string
}

export interface SignUPForm {
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    cPassword: FormControl<string | null>;
    role: FormControl<string | null>;
}
export interface LoginForm {
    username: FormControl<string | null>;
    password: FormControl<string | null>;
}