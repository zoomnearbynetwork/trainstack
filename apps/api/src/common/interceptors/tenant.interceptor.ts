import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const tenantSlug =
      request.headers['x-tenant-slug'] ||
      process.env.DEFAULT_TENANT_SLUG ||
      'demo-institute';

    return from(
      this.prisma.tenant.findUnique({
        where: { slug: String(tenantSlug) },
        select: { id: true, slug: true, name: true, plan: true }
      })
    ).pipe(
      mergeMap((tenant) => {
        if (!tenant) {
          throw new NotFoundException('Tenant not found');
        }
        request.tenant = tenant;
        return next.handle();
      })
    );
  }
}
