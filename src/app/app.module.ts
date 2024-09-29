import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Config from '../conf';
import {SequelizeModule} from '@nestjs/sequelize';

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
      host: configService.get<string>('db_host'),
      port: configService.get<number>('db_port'),
      username: configService.get<string>('db_username'),
      password: configService.get<string>('db_password'),
      database: configService.get<string>('db_database'),
      synchronize: true,
      autoLoadModels: true,
      models: [],
    })
  }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
