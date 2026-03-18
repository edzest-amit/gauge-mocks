import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { TenantsModule } from './modules/tenants/tenants.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}), 
    TenantsModule, AuthModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],

})
export class AppModule {}
