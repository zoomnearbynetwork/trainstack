import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { UserRole } from '@prisma/client';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN, UserRole.MARKETING_MANAGER)
  findAll(@CurrentTenant() tenant: { id: string }) {
    return this.campaignsService.findAll(tenant.id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN, UserRole.MARKETING_MANAGER)
  create(@Body() body: CreateCampaignDto, @CurrentTenant() tenant: { id: string }) {
    return this.campaignsService.create(tenant.id, body);
  }

  @Post(':id/run')
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN, UserRole.MARKETING_MANAGER)
  run(@Param('id') id: string, @CurrentTenant() tenant: { id: string }) {
    return this.campaignsService.run(tenant.id, id);
  }
}
