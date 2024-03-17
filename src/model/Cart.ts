import { CartEvent } from './CartEvent';
import { CartItem } from './CartItem';

export class Cart {
    public customerId: number;
    public cartItems: CartItem[];

    constructor(customerId: number) {
        this.customerId = customerId;
        this.cartItems = [];
    }

    public processEvent(cartEvent: CartEvent): void {
        switch (cartEvent.eventType) {
            case 'ADD_TO_CART':
                this.handleAddToCartEvent(cartEvent);
                break;
            case 'REMOVE_FROM_CART':
                this.handleRemoveFromCartEvent(cartEvent);
                break;
            case 'UPDATE_CART_ITEM_QUANTITY':
                this.handleUpdateCartItemQuantityEvent(cartEvent);
                break;
            case 'CLEAR_CART':
                this.handleClearCartEvent(cartEvent);
                break;
            default:
                break;
        }
    }

    private handleClearCartEvent(cartEvent: CartEvent): void {
        this.cartItems = [];
    }

    private handleUpdateCartItemQuantityEvent(cartEvent: CartEvent): void {
        const existingItemIndex = this.getCartIndexIfExists(cartEvent);
        if (existingItemIndex !== -1) {
            const cartItem = this.cartItems[existingItemIndex];
            if (cartItem) {
                cartItem.quantity = cartEvent.quantity;
                cartItem.price = cartEvent.price;
            }
        }
    }

    private handleRemoveFromCartEvent(cartEvent: CartEvent): void {
        this.cartItems = this.cartItems.filter(item => item.itemId !== cartEvent.itemId);
    }

    private handleAddToCartEvent(cartEvent: CartEvent): void {
        const existingItemIndex = this.getCartIndexIfExists(cartEvent);
        const newItem = this.createCartItem(cartEvent);
        if (existingItemIndex === -1) {
            this.cartItems.push(newItem);
        } else {
            this.cartItems[existingItemIndex] = newItem;
        }
    }

    private createCartItem(cartEvent: CartEvent): CartItem {
        return new CartItem(cartEvent.itemId, cartEvent.itemName, cartEvent.price, cartEvent.quantity);
    }

    private getCartIndexIfExists(cartEvent: CartEvent): number {
        return this.cartItems.findIndex(item => item.itemId === cartEvent.itemId);
    }
}
