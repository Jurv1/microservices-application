import { firstValueFrom } from 'rxjs';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from '../events/order.created.event';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OrderCreatedListener {
  constructor(private readonly httpService: HttpService) {}

  @OnEvent('order.created')
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    // Define the webhook URL
    const webhookUrl =
      'https://webhook.site/eb5e4d37-b09c-4003-9f95-e4f70280edee';

    const newUrl = 'http://localhost:3000/orders/kafka-info';

    // Send the data to the webhook
    await firstValueFrom(this.httpService.post(newUrl, event.message));
  }
}
