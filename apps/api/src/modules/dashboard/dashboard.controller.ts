import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  overview(@CurrentTenant() tenant: { id: string }) {
    return this.dashboardService.overview(tenant.id);
  }
}
