import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class AuthUserResponse {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  token: string
}