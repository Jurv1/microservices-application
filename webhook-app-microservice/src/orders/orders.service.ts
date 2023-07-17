import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './events/order.created.event';

@Injectable()
export class OrdersService {
  public orders = [
    {
      id: 1,
      name: 'Order #1',
      description: 'Description order #1',
    },
    {
      id: 2,
      name: 'Order #2',
      description: 'Description order #2',
    },
  ];

  constructor(private readonly eventEmitter: EventEmitter2) {
    console.log(this.orders);
    this.eventEmitter.emit('order.created');
  }

  async getOrders() {
    return this.orders;
  }

  async createOrder(data) {
    const order = {
      id: this.orders.length + 1,
      ...data,
    };
    this.orders.push(order);

    const orderCreatedEvent = new OrderCreatedEvent();
    orderCreatedEvent.name = order.name;
    orderCreatedEvent.description = order.description;
    orderCreatedEvent.message = `Hello your order ${order.name} was created, you can track order by his № ${order.id}`;
    this.eventEmitter.emit('order.created', orderCreatedEvent);

    return order;
  }
}
