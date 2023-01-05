import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccessData } from "../../models/AccessData.model";
import { AuthService } from "../ports/Auth.service";

export class LogInCommand {
    constructor(public readonly email: string, public readonly password: string){}
}

@CommandHandler(LogInCommand)
export class LogInCommandHandler implements ICommandHandler<LogInCommand, AccessData> {
  constructor(@Inject('AuthService') private authService: AuthService) {}

  async execute(command: LogInCommand): Promise<AccessData> {
    const { email, password } = command;

    const result = this.authService.authenticate(email, password);

    return result;
  }
}
