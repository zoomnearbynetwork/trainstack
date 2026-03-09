import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { WhatsappService } from './whatsapp.service';

@Controller('webhooks/whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get()
  verify(
    @Query('hub.mode') mode?: string,
    @Query('hub.verify_token') token?: string,
    @Query('hub.challenge') challenge?: string
  ) {
    return this.whatsappService.verify(mode, token, challenge);
  }

  @Post()
  inbound(@Body() body: any, @CurrentTenant() tenant: { id: string }, @Headers() _headers?: any) {
    return this.whatsappService.handleInbound(body, tenant.id);
  }
}
