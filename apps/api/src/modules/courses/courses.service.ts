import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(tenantId: string) {
    return this.prisma.course.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' }
    });
  }

  create(tenantId: string, data: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        tenantId,
        title: data.title,
        slug: data.slug,
        category: data.category,
        level: data.level,
        duration: data.duration,
        description: data.description,
        status: 'draft'
      }
    });
  }
}
