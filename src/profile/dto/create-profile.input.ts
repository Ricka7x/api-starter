import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  middleName?: string;
}
