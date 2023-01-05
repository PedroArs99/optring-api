import { AccessData } from "../../models/AccessData.model";
import { User } from "../../models/User.model";

export interface AuthService {
    authenticate(email: string, password: string): Promise<AccessData>;
    signUp(email: string, name: string, password): Promise<User>
}