import { Module } from '@nestjs/common'
import { AnalyticsService } from './services/analytics.service'
import { AnalyticsController } from './controllers/analytics.controller'
import { DatabaseModule } from '../../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}