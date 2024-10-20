import { Body, Controller, Delete, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '../auth/guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('api')
  @ApiResponse({status: 200, type: CreateUserDto})
  @Post('create_user')
  async createUsers(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiTags('api')
  @ApiResponse({status: 200, type: UpdateUserDto})
  @UseGuards(AuthGuard)
  @Patch('update_user')
  async updateUser(@Body() dto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
    const email = request.user.user

    console.log(email);
    return this.userService.updateUser(email, dto)
  }

  @ApiTags('api')
  @ApiResponse({status: 204})
  @UseGuards(AuthGuard)
  @Delete('delete_user')
  deleteUser(@Req() request){
    const email = request.user.user
    return this.userService.deleteUser(email)
  }
}
