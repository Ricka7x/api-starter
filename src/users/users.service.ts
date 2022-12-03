import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(authDto: AuthDto) {
    return this.prisma.user.create({
      data: authDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }
}
