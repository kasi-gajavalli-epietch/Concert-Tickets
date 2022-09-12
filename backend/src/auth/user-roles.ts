import { RolesBuilder } from "nest-access-control";

export enum UserRoles {
    Admin = 'Admin',
    Reader = 'Reader'
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(UserRoles.Admin)
    .readAny(['users', 'concert', 'bookings'])
    .updateAny(['users', 'concert', 'bookings'])
    .createAny(['users', 'concert', 'bookings'])
    .deleteAny(['users', 'concert', 'bookings'])

roles.grant(UserRoles.Reader)
    .readAny(['concert'])