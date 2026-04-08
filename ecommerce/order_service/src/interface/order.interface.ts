import { Order } from "../models/order.model";

export interface IOrderRepository {
  create(data: Order): Promise<Order>;
  update(data: Order): Promise<Order>;
  delete(id: string);
  find(id: string): Promise<Order[]>;
  findOne(id: string): Promise<Order>;
}
