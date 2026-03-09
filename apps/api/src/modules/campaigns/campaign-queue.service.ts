import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class CampaignQueueService {
  constructor(@InjectQueue('campaigns') private readonly queue: Queue) {}

  async enqueueCampaignRun(payload: Record<string, unknown>) {
    return this.queue.add('run-campaign', payload, {
      removeOnComplete: 50,
      removeOnFail: 100
    });
  }
}
