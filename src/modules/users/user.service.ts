import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ERROR_MESSAGE } from '../../common/constatns/errors';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async findUserByEmail(Email: string) {
    return await this.userRepository.findOne({ where: { Email } });
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.findUserByEmail(dto.Email);
    if (existUser) {
      throw new BadRequestException(ERROR_MESSAGE.USER_EXIST);
    }

    dto.Password = await this.hashPassword(dto.Password);
    await this.userRepository.create({
      FirstName: dto.FirstName,
      Username: dto.Username,
      Email: dto.Email,
      Password: dto.Password,
    });
    return dto;
  }

  async updateUser(Email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(dto, {where: {Email}})
    return dto;
  }

  async publicUser (Email: string ) {
    return await this.userRepository.findOne({
      where: { Email },

      attributes: {exclude: ['Password']}
    });
  }

  async deleteUser(Email: string ){
    await this.userRepository.destroy({where: {Email}
    })
    return true;
  }
}
