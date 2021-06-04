import { UserModel } from "../../src/models/user";

declare global{
    namespace Express {
        interface Request {
            currentUser: UserModel
        }
    }
    namespace Express {
        interface Response {
            paginatedResults: Array
        }
    }
}
