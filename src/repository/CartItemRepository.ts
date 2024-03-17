import { CartItem } from "../model/CartItem";
import {PGPoolConnection} from '../db/PGPoolConnection';
import {QUERIES} from '../db/queries/Query';

export class CartItemRepository{

    private PGPoolConnection: PGPoolConnection;
    constructor() {
        this.PGPoolConnection = new PGPoolConnection();
    }
    
    async findByCustomerId(customerId: number): Promise<CartItem[]> {
        const query = QUERIES.FIND_BY_CUSTOMER_ID_QUERY;
        const values = [customerId];
        const result = await this.PGPoolConnection.query(query, values);
        return result.rows;
    }
    

}