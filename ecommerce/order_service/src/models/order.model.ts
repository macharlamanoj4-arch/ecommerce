export class Order {
    constructor(
        public readonly userId: string,
        public readonly total: number,
        public readonly address: string,
        public readonly status: string,
        public readonly items: OrderItem[],
        public readonly tacker?: string,
        public readonly id?: string,
    ){}
}

export class OrderItem {
    constructor(
        public readonly productId: string,
        public readonly quantity: number,
        public readonly price: number,
        public readonly orderId: string,
    ){}
}

export class Cart{
    constructor(
        public readonly userId: string,
        public readonly total: number,
        public readonly items?: CartItem[],
        public readonly id?: string,
    ){}
}

export class CartItem{
    constructor(
        public readonly productId: string,
        public readonly quantity: number,
        public readonly price: number,
        public readonly cartId: string,
    ){}
}
