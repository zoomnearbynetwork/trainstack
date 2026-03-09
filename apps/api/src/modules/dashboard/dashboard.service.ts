import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(tenantId: string) {
    const [leads, courses, students, campaigns] = await Promise.all([
      this.prisma.lead.count({ where: { tenantId } }),
      this.prisma.course.count({ where: { tenantId } }),
      this.prisma.student.count({ where: { tenantId } }),
      this.prisma.campaign.count({ where: { tenantId } })
    ]);

    return {
      kpis: [
        { label: 'Total Leads', value: leads },
        { label: 'Active Courses', value: courses },
        { label: 'Students', value: students },
        { label: 'Campaigns', value: campaigns }
      ]
    };
  }
}
