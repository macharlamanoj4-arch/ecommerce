import { IOrderRepository } from "../interface/order.interface";
import { Order } from "../models/order.model";
import { PrismaClient, Order as PrismaOrder } from '../generated/prisma/client'


export class OrderRepository implements IOrderRepository {
    _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    create(data: Order): Promise<Order> {
        return this._prisma.order.create({
            data,
        })
    }
    update(data: Order): Promise<Order> {
        return this._prisma.order.update({
            where: { id: data.id }
            data,
        })
    }
    delete(id: any) {
        return this._prisma.order.delete({
            where: { id }
        })
    }
    find(id: string): Promise<Order[]> {
        return this._prisma.order.findMany({
            where: { id },
            orderBy: {
                createdAt: "desc",
            },
        })
    }
    findOne(id: string): Promise<Order> {
        return this._prisma.order.findFirst({
            where:{id},
        })
    }

}
