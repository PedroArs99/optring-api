import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../models/User.model';
import { AuthService } from '../ports/Auth.service';

export class RegisterUserCommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
  ) {}
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand, User> {
  constructor(@Inject('AuthService') private authService: AuthService) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    const { email, name, password } = command;

    const result = this.authService.signUp(email, name, password);

    return result;
  }
}
