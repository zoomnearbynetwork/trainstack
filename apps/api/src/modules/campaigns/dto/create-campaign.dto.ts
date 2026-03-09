import { IsObject, IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  name!: string;

  @IsString()
  channel!: string;

  @IsString()
  triggerType!: string;

  @IsObject()
  configJson!: Record<string, unknown>;
}
