import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  create(authDto: AuthDto) {
    return this.userService.create(authDto);
  }
}
