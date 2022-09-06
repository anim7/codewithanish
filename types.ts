import { SessionContext, SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "db"

export type Role = "ADMIN" | "USER"

declare module "@blitzjs/auth" {
  export interface Ctx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
