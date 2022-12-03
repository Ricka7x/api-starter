import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
