import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty()
  @IsString()
  FirstName: string;

  @ApiProperty()
  @IsString()
  Username: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  Password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  FirstName: string;

  @ApiProperty()
  @IsString()
  Username: string;

  @ApiProperty()
  @IsEmail()
  Email: string;
}
