import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { UserRole } from '@prisma/client';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN, UserRole.COUNSELOR, UserRole.TRAINER)
  findAll(@CurrentTenant() tenant: { id: string }) {
    return this.coursesService.findAll(tenant.id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN)
  create(@Body() body: CreateCourseDto, @CurrentTenant() tenant: { id: string }) {
    return this.coursesService.create(tenant.id, body);
  }
}
