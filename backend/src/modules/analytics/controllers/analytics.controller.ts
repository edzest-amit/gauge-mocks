import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common'
import { AnalyticsService } from '../services/analytics.service'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('concepts')
  getConceptAnalytics(@Request() req) {
    return this.analyticsService.getConceptAnalytics(
      req.user.userId,
      req.user.tenantId
    )
  }

  @Get('practice')
@UseGuards(JwtAuthGuard)
getPracticeQuestions(@Request() req) {
  return this.analyticsService.getPracticeQuestions(
    req.user.userId,
    req.user.tenantId
  )
}

@Post('adaptive-question')
@UseGuards(JwtAuthGuard)
getAdaptiveQuestion(@Request() req, @Body() body: any) {
  return this.analyticsService.getAdaptiveQuestion(
    req.user.userId,
    req.user.tenantId,
    body
  )
}

}