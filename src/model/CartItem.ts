export class CartItem {
    public itemId: number;
    public itemName: string;
    public price: number;
    public quantity: number;

    constructor(itemId: number, itemName: string, price: number, quantity: number) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
}

