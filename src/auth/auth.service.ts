import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async signup(authDto: AuthDto): Promise<AuthResponse> {
    const user = await this.userService.create(authDto);
    const accessToken = this.getJwtToken(user.id);

    return { accessToken };
  }

  async signin(authDto: AuthDto): Promise<AuthResponse> {
    const { password } = authDto;
    const user = await this.userService.findOneByEmail(authDto);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email / Password do not match');
    }

    const accessToken = this.getJwtToken(user.id);

    return { accessToken };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    delete user.password;
    return user;
  }

  revalidateToken(user: User): AuthResponse {
    const accessToken = this.getJwtToken(user.id);

    return { accessToken };
  }
}
