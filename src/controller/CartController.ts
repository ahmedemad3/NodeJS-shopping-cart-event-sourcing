import { Request, Response } from 'express';
import { CartEventService } from '../service/CartEventService';
import { CartService } from '../service/CartService';
import { CartEvent } from '../model/CartEvent';
import { Cart } from '../model/Cart';



export class CartController {
    private cartEventService: CartEventService;
    private cartService: CartService;

    constructor(cartEventService: CartEventService, cartService: CartService) {
        this.cartEventService = cartEventService;
        this.cartService = cartService;
    }

    async getCartEvents(req: Request, res: Response): Promise<void> {
        // Implementation for getting cart events
        const customerId = Number(req.params.customerId);
        try {
            const cartEvents = await this.cartEventService.getCartEventsByCustomerId(customerId);
            res.status(200).json(cartEvents);
        } catch (error) {
            console.log("error" + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addCartEvent(req: Request, res: Response): Promise<void> {
        // Implementation for adding a cart event

        const customerId = Number(req.params.customerId);
        const cartEvent: CartEvent = req.body;
        cartEvent.customerId = customerId;
        try {
            await this.cartEventService.addCartEvent(cartEvent);
            res.status(201).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getCustomerCartWithAggregations(req: Request, res: Response): Promise<void> {
        // Implementation for getting customer cart with aggregations
        const customerId = Number(req.params.customerId);
        try {
            const cart: Cart = await this.cartEventService.getCustomerCartWithAggregations(customerId);
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(404).json({ error: 'Cart not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getCustomerCart(req: Request, res: Response): Promise<void> {
        // Implementation for getting customer cart
        const customerId = Number(req.params.customerId);
        try {
            const cart: Cart = await this.cartService.getCustomerCart(customerId);
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(404).json({ error: 'Cart not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}