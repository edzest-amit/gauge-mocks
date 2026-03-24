import { Module } from '@nestjs/common'
import { QuestionController } from './controllers/question.controller'
import { QuestionService } from './services/question.service'
import { QuestionRepository } from './repositories/question.repository'
import { DatabaseModule } from '../../database/database.module'
import { UploadController } from './controllers/upload.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionController, UploadController],
  providers: [QuestionService, QuestionRepository]
})
export class QuestionBankModule {}