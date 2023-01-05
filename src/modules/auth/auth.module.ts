import { Module } from '@nestjs/common';
import { AuthService } from './CognitoAuth.service';

@Module({
  providers: [AuthService]
})
export class AuthModule {}
