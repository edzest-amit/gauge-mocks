
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthRepository } from './repositories/auth.repository';

import { DatabaseModule } from '../../database/database.module'


@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
    useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
    }),
    }),
  ],
  
  controllers: [AuthController],
  
  providers: [AuthService, JwtStrategy, AuthRepository],
})
export class AuthModule {}



