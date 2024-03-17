-- "shopping-cart".cart_event definition

-- Drop table

-- DROP TABLE "shopping-cart".cart_event;

CREATE TABLE "shopping-cart".cart_event (
	id bigserial NOT NULL,
	customer_id int8 NOT NULL,
	event_type varchar(255) NOT NULL,
	event_date timestamp NOT NULL,
	item_id int8 NULL,
	item_name varchar(255) NULL,
	quantity int4 NULL,
	price float8 NULL,
	CONSTRAINT cart_event_pkey PRIMARY KEY (id)
);
CREATE INDEX customer_id_idex ON "shopping-cart".cart_event USING btree (customer_id);

-- Table Triggers

create trigger after_insert_cart_event after
insert
    on
    "shopping-cart".cart_event for each row execute function "shopping-cart".update_cartitem();


-- "shopping-cart".cart definition

-- Drop table

-- DROP TABLE "shopping-cart".cart;

CREATE TABLE "shopping-cart".cart_item (
	customer_id int8 NOT NULL,
	item_id int8 NOT NULL,
	quantity int4 NULL,
	price numeric(10, 2) NULL,
	CONSTRAINT cart_state_pkey PRIMARY KEY (customer_id, item_id)
);

create index customer_id_item_idex on cart_item(customer_id);
