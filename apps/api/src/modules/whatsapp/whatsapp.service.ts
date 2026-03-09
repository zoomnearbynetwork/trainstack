import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WhatsappService {
  constructor(private readonly prisma: PrismaService) {}

  verify(mode?: string, token?: string, challenge?: string) {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'verify-token';
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge || 'verified';
    }
    throw new Error('Invalid verification token');
  }

  async handleInbound(payload: any, tenantId: string) {
    const value = payload?.entry?.[0]?.changes?.[0]?.value;
    const incoming = value?.messages?.[0];
    const phone = incoming?.from;
    const text = incoming?.text?.body || 'Incoming WhatsApp message';

    let lead = await this.prisma.lead.findFirst({ where: { tenantId, phone } });

    if (!lead) {
      lead = await this.prisma.lead.create({
        data: {
          tenantId,
          fullName: phone || 'WhatsApp Lead',
          phone,
          source: 'whatsapp',
          status: 'new',
          score: 50
        }
      });
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        tenantId,
        leadId: lead.id,
        channel: 'whatsapp',
        externalThreadId: phone,
        status: 'open'
      }
    });

    await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        direction: 'inbound',
        content: text,
        contentType: 'text'
      }
    });

    return { received: true, leadId: lead.id, conversationId: conversation.id };
  }
}
