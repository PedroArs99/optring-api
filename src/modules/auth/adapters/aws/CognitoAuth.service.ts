import { Injectable } from '@nestjs/common';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { AuthService } from '../../application/ports/Auth.service';
import { User } from '../../models/User.model';

@Injectable()
export class CognitoAuthService implements AuthService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });
  }

  async signUp(email: string, name: string, password: any): Promise<User> {
    const result = new Promise<User>((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'name',
            Value: name,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            const user = new User(email, name);
            resolve(user);
          }
        },
      );
    });

    return result;
  }
}
