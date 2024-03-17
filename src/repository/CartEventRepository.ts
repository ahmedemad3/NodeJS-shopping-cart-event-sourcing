import { CartEvent } from '../model/CartEvent';
import {PGPoolConnection} from '../db/PGPoolConnection';
import {QUERIES} from '../db/queries/Query';

export class CartEventRepository{

    private PGPoolConnection: PGPoolConnection;
    constructor() {
        this.PGPoolConnection = new PGPoolConnection();
    }

    async save(cartEvent: CartEvent) {
        const query = QUERIES.SAVE_CART_EVENT_QUERY;

        const values = [
            cartEvent.customerId , 
            cartEvent.eventType , 
            cartEvent.itemId , 
            cartEvent.itemName,
            cartEvent.price,
            cartEvent.quantity,
            cartEvent.eventDate];

        const result = await this.PGPoolConnection.query(query, values);

        if (result.rows.length === 0) {
            throw new Error('Failed to save cart event');
          }
          
        return result.rows[0];
    }
    async findByCustomerIdOrderByEventDateAsc(customerId: number): Promise<CartEvent[]> {
        const query = QUERIES.FIND_BY_CUSTOMER_ID_ORDERBY_EVENT_DATE_QUERY;
        const values = [customerId];
        const result = await  this.PGPoolConnection.query(query, values);
        return result.rows;
    }
}