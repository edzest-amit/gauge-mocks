import { Module } from '@nestjs/common';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeRepository } from './repositories/knowledge.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [KnowledgeController],
  providers: [KnowledgeService, KnowledgeRepository],
})
export class KnowledgeModule {}