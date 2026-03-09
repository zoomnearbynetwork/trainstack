import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(tenantId: string) {
    return this.prisma.lead.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.lead.findFirst({
      where: { id, tenantId },
      include: { activities: true, conversations: true }
    });
  }

  async create(tenantId: string, data: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        tenantId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        source: data.source,
        status: data.status || 'new',
        score: data.score || 0
      }
    });

    await this.prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        type: 'lead_created',
        metaJson: {}
      }
    });

    return lead;
  }
}
