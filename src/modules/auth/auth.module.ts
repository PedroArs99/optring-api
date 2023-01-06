import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CognitoAuthService } from './adapters/aws/CognitoAuth.service';
import { AuthController } from './adapters/graphql/Auth.controller';
import { LogInCommandHandler } from './application/commands/LogIn.command';
import { RegisterUserCommandHandler } from './application/commands/RegisterUser.command';

const commandHandlers = [
  LogInCommandHandler,
  RegisterUserCommandHandler,
]

@Module({
  controllers: [AuthController],
  imports: [CqrsModule],
  providers: [
    {
      provide: 'AuthService',
      useClass: CognitoAuthService,
    },
    ...commandHandlers,
  ],
})
export class AuthModule {}
