import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/enums/valid-roles.enum';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'GetUsers' })
  findAll(@GetUser([Roles.ADMIN]) _user: User): Promise<User[]> {
    console.log(_user);
    return this.usersService.findAll();
  }
}
