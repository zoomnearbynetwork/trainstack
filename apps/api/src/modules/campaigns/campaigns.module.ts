import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CampaignQueueService } from './campaign-queue.service';
import { CampaignsController } from './campaigns.controller';
import { CampaignsProcessor } from './campaigns.processor';
import { CampaignsService } from './campaigns.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'campaigns' })],
  providers: [CampaignQueueService, CampaignsService, CampaignsProcessor],
  controllers: [CampaignsController]
})
export class CampaignsModule {}
