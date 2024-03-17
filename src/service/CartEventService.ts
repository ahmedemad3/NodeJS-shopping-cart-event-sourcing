import { CartEvent } from '../model/CartEvent';
import { Cart } from '../model/Cart';
import { CartEventRepository } from '../repository/CartEventRepository';

export class CartEventService {
    private cartEventRepository: CartEventRepository;

    constructor(cartEventRepository: CartEventRepository) {
        this.cartEventRepository = cartEventRepository;
    }

    public async getCartEventsByCustomerId(customerId: number): Promise<CartEvent[]> {
        return await this.cartEventRepository.findByCustomerIdOrderByEventDateAsc(customerId);
    }

    public async addCartEvent(cartEvent: CartEvent): Promise<void> {
        this.cartEventRepository.save(cartEvent);
    }

    public async getCustomerCartWithAggregations(customerId: number): Promise<Cart> {
        const cartEvents: CartEvent[] = await this.getCartEventsByCustomerId(customerId);
        const cart: Cart = new Cart(customerId);
        cartEvents.forEach(event => cart.processEvent(event));
        return cart;
    }
}
