import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { UserRole } from '@prisma/client';

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN, UserRole.COUNSELOR)
  findAll(@CurrentTenant() tenant: { id: string }) {
    return this.leadsService.findAll(tenant.id);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN, UserRole.COUNSELOR)
  findOne(@Param('id') id: string, @CurrentTenant() tenant: { id: string }) {
    return this.leadsService.findOne(id, tenant.id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN, UserRole.COUNSELOR)
  create(@Body() body: CreateLeadDto, @CurrentTenant() tenant: { id: string }) {
    return this.leadsService.create(tenant.id, body);
  }
}
