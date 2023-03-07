import { User } from "../../entities";
import { selectUserInterface } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      loggedUser: User | null;
      isAdmin: boolean;
    }
  }
}