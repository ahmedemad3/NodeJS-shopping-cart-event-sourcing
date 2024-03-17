import { CartItemRepository } from '../repository/CartItemRepository';
import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';


export class CartService {
    private cartItemRepository: CartItemRepository;

    constructor(cartItemRepository: CartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public async getCustomerCart(customerId: number): Promise<Cart> {
        const cart: Cart = new Cart(customerId);
        const cartItems: CartItem[] = await this.cartItemRepository.findByCustomerId(customerId);
        cart.cartItems = cartItems;
        return cart;
    }
}
