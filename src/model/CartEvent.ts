// CartEvent.ts
export class CartEvent {
    id!: number;
    customerId!: number;
    eventType!: string;
    eventDate!: Date;
    itemId!: number;
    itemName!: string;
    quantity!: number;
    price!: number;
}
