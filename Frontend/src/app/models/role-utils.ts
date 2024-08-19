import { Role } from "./role";


export function getRoleName(role: Role): string {
    switch (role) {
      case Role.ADMIN:
        return 'ADMIN';
      case Role.MANAGER:
        return 'MANAGER';
      case Role.COLLAB:
        return 'COLLAB';
      default:
        return 'Unknown Role';
    }
  }