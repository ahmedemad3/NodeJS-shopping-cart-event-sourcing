CREATE OR REPLACE FUNCTION "shopping-cart".update_cartItem()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.event_type = 'ADD_TO_CART' OR NEW.event_type = 'UPDATE_CART_ITEM_QUANTITY' THEN
        -- Insert or update item in the denormalized table
        INSERT INTO "shopping-cart".cart_item(customer_id, item_id, quantity, price)
        VALUES (NEW.customer_id, NEW.item_id, NEW.quantity, NEW.price)
        ON CONFLICT (customer_id, item_id) 
        DO UPDATE SET quantity = EXCLUDED.quantity, price = EXCLUDED.price;
    ELSIF NEW.event_type = 'REMOVE_FROM_CART' THEN
        -- Remove item from the denormalized table
        DELETE FROM "shopping-cart".cart_item 
        WHERE customer_id = NEW.customer_id AND item_id = NEW.item_id;
    END IF;
    RETURN NEW;
END;
$function$
;
