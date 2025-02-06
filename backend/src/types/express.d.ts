import { User } from "../entities/User.entitiy";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
