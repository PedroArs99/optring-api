import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CognitoAuthService } from './adapters/aws/CognitoAuth.service';
import { AuthController } from './adapters/graphql/Auth.controller';
import { RegisterUserCommandHandler } from './application/commands/RegisterUser.command';

@Module({
  controllers: [AuthController],
  imports: [CqrsModule],
  providers: [
    {
      provide: 'AuthService',
      useClass: CognitoAuthService,
    },
    RegisterUserCommandHandler,
  ],
})
export class AuthModule {}
