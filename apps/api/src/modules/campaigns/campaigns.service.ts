import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignQueueService } from './campaign-queue.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly campaignQueue: CampaignQueueService
  ) {}

  findAll(tenantId: string) {
    return this.prisma.campaign.findMany({
      where: { tenantId },
      include: { runs: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  create(tenantId: string, dto: CreateCampaignDto) {
    return this.prisma.campaign.create({
      data: {
        tenantId,
        name: dto.name,
        channel: dto.channel,
        triggerType: dto.triggerType,
        configJson: dto.configJson,
        status: 'draft'
      }
    });
  }

  async run(tenantId: string, campaignId: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, tenantId }
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const run = await this.prisma.campaignRun.create({
      data: {
        campaignId: campaign.id,
        targetType: 'tenant',
        targetId: tenantId,
        status: 'queued'
      }
    });

    await this.campaignQueue.enqueueCampaignRun({
      tenantId,
      campaignId: campaign.id,
      campaignRunId: run.id
    });

    return { queued: true, runId: run.id };
  }
}
