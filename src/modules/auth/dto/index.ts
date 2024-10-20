import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

let isString = IsString();

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @isString
  password: string;
}