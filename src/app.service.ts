import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('APP_VERSION') private readonly version: string) {}
  getHello(): string {
    return `Hello World! v${this.version}`;
  }
}
