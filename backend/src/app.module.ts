import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { TenantsModule } from './modules/tenants/tenants.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { QuestionBankModule } from './modules/question-bank/question-bank.module';
import { ExamModule } from './modules/exam/exam.module'
import { AnalyticsModule } from './modules/analytics/analytics.module'
import * as path from 'path'



console.log('ENV CHECK:', process.env.DATABASE_URL)

@Module({
  imports: [
    ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: path.resolve(process.cwd(), '.env'),
}),
    TenantsModule, 
    AuthModule, 
    UsersModule, 
    KnowledgeModule,
    DatabaseModule, 
    QuestionBankModule,
    ExamModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],

})
export class AppModule {}
