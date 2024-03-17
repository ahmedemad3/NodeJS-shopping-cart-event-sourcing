import express, { Request, Response } from 'express';
import { CartController } from '../controller/CartController';
import { CartEventService } from '../service/CartEventService';
import { CartService } from '../service/CartService';
import { CartEventRepository } from '../repository/CartEventRepository';
import { CartItemRepository } from '../repository/CartItemRepository';

const router = express.Router();

// Create instances of repositories and services
const cartEventRepository = new CartEventRepository();
const cartItemRepository = new CartItemRepository();
const cartEventService = new CartEventService(cartEventRepository);
const cartService = new CartService(cartItemRepository);

const cartController = new CartController(cartEventService , cartService);

router.get('/:customerId/events', async (req: Request, res: Response) => {
    // Handle GET /api/v1/cart/:customerId/events
    cartController.getCartEvents(req,res);
});

router.post('/:customerId/events', async (req: Request, res: Response) => {
    // Handle POST /api/v1/cart/:customerId/events
    cartController.addCartEvent(req,res);
});

router.get('/aggregation/:customerId', async (req: Request, res: Response) => {
    // Handle GET /api/v1/cart/aggregation/:customerId
    cartController.getCustomerCartWithAggregations(req,res);
});

router.get('/:customerId', async (req: Request, res: Response) => {
    // Handle GET /api/v1/cart/:customerId
    cartController.getCustomerCart(req,res);
});

export default router;