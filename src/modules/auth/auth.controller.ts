import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('api')
  @ApiResponse({status: 201, type: CreateUserDto})
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUser(dto)
  }

  @ApiTags('api')
  @ApiResponse({status: 200, type: AuthUserResponse})
  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return true;
  }
}
