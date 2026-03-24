
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { Param } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CreateConceptDto } from './dto/create-concept.dto';

@Controller('knowledge')
export class KnowledgeController {

  constructor(private knowledgeService: KnowledgeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('subjects')
  createSubject(
    @Tenant() tenantId: string,
    @Body() dto: CreateSubjectDto
  ) {

    return this.knowledgeService.createSubject(
      tenantId,
      dto.name,
      dto.description
    );

  }

  @UseGuards(JwtAuthGuard)
    @Get('subjects')
    getSubjects(
    @Tenant() tenantId: string
    ) {

  return this.knowledgeService.getSubjects(tenantId);

    }


    @UseGuards(JwtAuthGuard)
@Post('topics')
createTopic(
  @Tenant() tenantId: string,
  @Body() dto: CreateTopicDto
) {

  return this.knowledgeService.createTopic(
    tenantId,
    dto.subjectId,
    dto.name,
    dto.description
  );

}

@UseGuards(JwtAuthGuard)
@Get('topics/:subjectId')
getTopicsBySubject(
  @Tenant() tenantId: string,
  @Param('subjectId') subjectId: string
) {

  return this.knowledgeService.getTopicsBySubject(
    tenantId,
    subjectId
  );

}

@UseGuards(JwtAuthGuard)
@Post('concepts')
createConcept(
  @Tenant() tenantId: string,
  @Body() dto: CreateConceptDto
) {

  return this.knowledgeService.createConcept(
    tenantId,
    dto.topicId,
    dto.name,
    dto.description
  );

}

@UseGuards(JwtAuthGuard)
@Get('concepts/:topicId')
getConceptsByTopic(
  @Tenant() tenantId: string,
  @Param('topicId') topicId: string
) {

  return this.knowledgeService.getConceptsByTopic(
    tenantId,
    topicId
  );

}

}