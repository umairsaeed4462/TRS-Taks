import { colDef } from "@bhplugin/ng-datatable";

export const EVENTS_COLUMNS: Array<colDef> = [
    { field: "title", title: "Event Title", filter: false },
    { field: "description", title: "Description" },
    { field: "date", title: "Date", type: "date" },
    { field: "location", title: "Location", filter: true },
    { field: "status", title: "Status" },
    { field: "members", title: "Joined Members" },
    { field: "actions", title: "Actions", sort: false },
]

export const USER_COLUMNS: Array<colDef> = [
    { field: "username", title: "Username", filter: false },
    { field: "email", title: "Email" },
    { field: "role", title: "Role" },
    { field: "actions", title: "Actions", sort: false },
]