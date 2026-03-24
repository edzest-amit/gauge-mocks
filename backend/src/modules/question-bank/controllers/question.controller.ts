import { Controller, Post, Body, UseGuards, Request, Param, Get, Query } from '@nestjs/common'
import { QuestionService } from '../services/question.service'
import { CreateQuestionDto } from '../dto/create-question.dto'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { AddContentDto } from '../dto/add-content.dto'
import { AddOptionDto } from '../dto/add-option.dto'
import { AddConceptDto } from '../dto/add-concept.dto'
import { AddTagDto } from '../dto/add-tag.dto'
import { PublishQuestionDto } from '../dto/publish-question.dto'
import { GetQuestionsDto } from '../dto/get-questions.dto'


@Controller('questions')
export class QuestionController {
  constructor(private service: QuestionService) {}

@UseGuards(JwtAuthGuard)
@Post()
createQuestion(@Body() dto: CreateQuestionDto, @Request() req) {
    return this.service.createQuestion(dto, req.user)
  }

@UseGuards(JwtAuthGuard)
@Get(':id')
getQuestion(
  @Param('id') id: string,
  @Request() req
) {
  return this.service.getQuestionById(id, req.user)
}
  

@UseGuards(JwtAuthGuard)
@Post(':id/content')
addContent(
  @Param('id') id: string,
  @Body() dto: AddContentDto,
  @Request() req
) {
  return this.service.addContent(id, dto, req.user)
}

@UseGuards(JwtAuthGuard)
@Post(':id/options')
addOptions(
  @Param('id') id: string,
  @Body() dto: AddOptionDto,
  @Request() req
) {
  return this.service.addOptions(id, dto, req.user)
}

@UseGuards(JwtAuthGuard)
@Post(':id/concepts')
addConcepts(
  @Param('id') id: string,
  @Body() dto: AddConceptDto,
  @Request() req
) {
  return this.service.addConcepts(id, dto, req.user)
}

@UseGuards(JwtAuthGuard)
@Post(':id/tags')
addTags(
  @Param('id') id: string,
  @Body() dto: AddTagDto,
  @Request() req
) {
  return this.service.addTags(id, dto, req.user)
}

@UseGuards(JwtAuthGuard)
@Post(':id/publish')
publishQuestion(
  @Param('id') id: string,
  @Body() dto: PublishQuestionDto,
  @Request() req
) {
  return this.service.publishQuestion(id, dto, req.user)
}


@UseGuards(JwtAuthGuard)
@Get()
getQuestions(
  @Query() query: GetQuestionsDto,
  @Request() req
) {
  return this.service.getQuestions(query, req.user)
}

}