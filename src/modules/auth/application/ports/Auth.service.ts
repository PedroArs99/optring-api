import { User } from "../../models/User.model";

export interface AuthService {
    signUp(email: string, name: string, password): User
}