import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'Alex', description: 'name of user'})
  readonly telegram_user_name: string;

  readonly telegram_id: string;

  readonly first_name: string;

  readonly last_name: string;

  readonly membership_type: string;

  readonly generation: number;

  readonly date_of_birth: Date;

  readonly date_of_join: Date;
}