import { colDef } from "@bhplugin/ng-datatable";

export const EVENTS_COLUMNS: Array<colDef> = [
    { field: "title", title: "Event Title", },
    { field: "date", title: "Date", type: "date" },
    { field: "location", title: "Location" },
    { field: "status", title: "Status" },
    { field: "actions", title: "Actions", sort: false, filter: false },
]

export const USER_COLUMNS: Array<colDef> = [
    { field: "username", title: "Username" },
    { field: "email", title: "Email" },
    { field: "role", title: "Role" },
    { field: "actions", title: "Actions", sort: false, filter: false },
]

export const DEFAULT_ROLE_ID = "6787e80c1083058f2bb3378e";