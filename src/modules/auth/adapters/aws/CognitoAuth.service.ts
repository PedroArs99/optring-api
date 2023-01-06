import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthService } from '../../application/ports/Auth.service';
import { AccessData } from '../../models/AccessData.model';
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

  async authenticate(email: string, password: string): Promise<AccessData> {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser(userData);

    const result = new Promise<AccessData>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          resolve(
            new AccessData(
              result.getAccessToken().getJwtToken(),
              result.getRefreshToken().getToken(),
            ),
          );
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
    return result;
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
