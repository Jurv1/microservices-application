import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {OrderBodyDto} from "./types/order-body.dto";

@Controller('orders')
export class OrdersController {
  constructor(@Inject('ORDERS') private readonly ordersClient: ClientKafka) {}

  @Get()
  async getOrders() {
    await this.ordersClient.emit('get.orders', '');
  }

  @Post()
  async createOrder(@Body() orderBody: OrderBodyDto) {
    await this.ordersClient.emit('add.new.order', JSON.stringify(orderBody));
  }

  //Producer получает обработанную инфу от хука и отправляет ее Consumer с помощью kafka
  @Post('kafka-info')
  async extractKafkaMessageReworkItAndSend(@Body() ok: string) {
    console.log(ok);
  }
}
