import { UserModel } from "./user.model";

export interface Permission {
    dashboard: {
        view: boolean;
        totalUser: boolean;
        totalPendingEvent: boolean;
        totalActiveEvent: boolean;
        totalEventJoins: boolean;
    };
    user: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
    event: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
        approved: boolean;
        join: boolean;
    };
    role: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
}

export interface Role {
    _id: string;
    role: string;
    permission: Permission;
}
export interface RoleDetails extends Role {
    users: UserModel[];
}