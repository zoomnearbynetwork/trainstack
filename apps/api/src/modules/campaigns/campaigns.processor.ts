import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('campaigns')
export class CampaignsProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<{ campaignRunId: string; campaignId: string; tenantId: string }>) {
    const { campaignRunId, campaignId } = job.data;

    await this.prisma.campaignRun.update({
      where: { id: campaignRunId },
      data: {
        status: 'completed',
        executedAt: new Date(),
        resultJson: {
          message: `Campaign ${campaignId} processed`,
          provider: 'mock'
        }
      }
    });

    return { ok: true };
  }
}
