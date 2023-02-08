PRAGMA foreign_keys = OFF;

BEGIN;

INSERT INTO users (id,username, email, hash, created_at) VALUES 
    (1, 'Admin', 'a@example.com', '$2a$12$yOeykUh.TtpgL81yp44NN./HYBiBJ2cpRQCJSAHtZ2fAM0HB0teXW', '2017-12-25 00:00:00' )

ON CONFLICT DO NOTHING;

INSERT INTO foods (id,dish_name, food_desc, user_id,rating) VALUES
    (1, 'Chocolate Bombé', 'An explosion of flavour and chocolate', 1, 5)

ON CONFLICT DO NOTHING;

COMMIT;
 