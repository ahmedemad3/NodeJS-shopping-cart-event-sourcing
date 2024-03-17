export const QUERIES = {
    SAVE_CART_EVENT_QUERY : "",
    FIND_BY_CUSTOMER_ID_QUERY : "SELECT customer_id, item_id, quantity, price, item_name FROM cart_item where customer_id= $1",
    FIND_BY_CUSTOMER_ID_ORDERBY_EVENT_DATE_QUERY : "SELECT id, customer_id, event_type, event_date, item_id, item_name, quantity, price FROM cart_event where customer_id= $1 order by event_date asc",
}