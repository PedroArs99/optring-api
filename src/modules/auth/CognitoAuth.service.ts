import { Injectable } from '@nestjs/common';
import { CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { RegisterUserCommand } from './RegisterUser.command';

@Injectable()
export class CognitoAuthService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });
  }

  async registerUser(command: RegisterUserCommand): Promise<CognitoUser> {
    const { email, name, password } = command;

    const result = new Promise<CognitoUser>((resolve, reject) => {
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
          console.log(result);
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });

    return result;
  }
}
