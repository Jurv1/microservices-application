import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IKafkaMessage } from './interfaces.and.types/kafka-message.interface';
import { OrderType } from './interfaces.and.types/order.type';
import { OrdersService } from './orders/orders.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly orderService: OrdersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('get.orders')
  async getOrders() {
    return this.orderService.getOrders();
  }

  @EventPattern('add.new.order')
  async createOrder(@Payload() message: IKafkaMessage<OrderType>) {
    console.log(message);
    return await this.orderService.createOrder(message);
  }

  @EventPattern('get.info')
  async getNewInfo(@Payload() message: IKafkaMessage<string>) {
    console.log(message.value);
  }
}
