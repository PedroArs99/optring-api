import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LogInCommand } from '../../application/commands/LogIn.command';
import { RegisterUserCommand } from '../../application/commands/RegisterUser.command';
import { AccessData } from '../../models/AccessData.model';
import { UserDto } from './UserDto.model';

@Controller('/auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('signUp')
  async signUp(@Body() command: RegisterUserCommand): Promise<UserDto> {
    const registerUserCommand = new RegisterUserCommand(
      command.email,
      command.name,
      command.password,
    );
    const result = await this.commandBus.execute(registerUserCommand);
    console.log(result);

    return new UserDto(result.email, result.name);
  }

  @Post('logIn')
  async logIn(@Body() command: LogInCommand): Promise<AccessData> {
    const logInCommand = new LogInCommand(command.email, command.password);
    const result = this.commandBus.execute(logInCommand);

    return result
  }
}
