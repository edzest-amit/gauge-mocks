import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { ExamService } from '../services/exam.service'

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @UseGuards(JwtAuthGuard)
  @Post('start')
async startExam(@Req() req: any, @Body() body: any) {
  return this.examService.startExam(req.user, body)
}

  @UseGuards(JwtAuthGuard)
@Post('submit')
async submitExam(@Req() req: any, @Body() body: any) {
  return this.examService.submitExam(req.user, body)
}
}