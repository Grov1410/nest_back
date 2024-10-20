import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto';
import { ERROR_MESSAGE } from '../../common/constatns/errors';
import { LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.Email);
    if (existUser) throw new BadRequestException(ERROR_MESSAGE.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: LoginUserDto){
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user)  throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);

    const validPassword = await bcrypt.compare(dto.password, user.Password)
    if (!validPassword) throw new BadRequestException(ERROR_MESSAGE.ERROR_LOGIN);
    // const userData = {
    //   name: user.FirstName,
    //   email: user.Email,
    // }

    const token = await this.tokenService.generateJwtToken(user.Email)
    // const publicUser = await this.userService.publicUser(dto.email);

    const result = {
      id: user.id,
      username: user.Username,
      email: user.Email,
      token: token,
    }
    return result;
  }
}
