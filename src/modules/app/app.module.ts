import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Config from '../../conf';
import {SequelizeModule} from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [Config],
    }
  ),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      host: configService.get('db_host'),
      port: parseInt(configService.get('db_port'), 10) || 5432,
      username: configService.get('db_user'),
      password: configService.get('db_password'),
      database: configService.get('db_name'),
      synchronize: true,
      autoLoadModels: true,
      models: [User],
    })
  }),
    UserModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
