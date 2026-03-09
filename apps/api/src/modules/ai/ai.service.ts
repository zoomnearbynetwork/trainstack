import { Injectable, Logger } from '@nestjs/common';
import { promptLibrary } from '@trainstack/prompts';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async generateWebsiteCopy(topic: string) {
    this.logger.log(`Generating website copy for ${topic}`);
    return {
      prompt: promptLibrary.websiteHome,
      text: `Welcome to ${topic}. Build your IT career with expert-led training, real projects, and placement support.`
    };
  }
}
