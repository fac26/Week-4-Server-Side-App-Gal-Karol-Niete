const db = require('../database/db');

const get_all_foods = db.prepare(/*sql*/ `
    SELECT
    id, 
    dish_name,
    food_desc,
    rating,
    image_path
    FROM foods
    `);

function getAllFoods() {
    return get_all_foods.all();
}

const get_user_foods = db.prepare(/*sql*/ `
    SELECT
    id,
    user_id, 
    dish_name,
    food_desc,
    rating,
    image_path
    FROM foods
    WHERE id = ?
    `);

function getUserFoods(user_id) {
    return get_user_foods.all(user_id);
}

const insert_food = db.prepare(/*sql*/ `
    INSERT INTO foods (user_id, dish_name, food_desc, rating, image_path)
    VALUES ($user_id, $dish_name, $food_desc, $rating, $image_path)
    RETURNING id
`);

function insertFood(user_id, dish_name, food_desc, rating, image_path) {
    return insert_food.get({ user_id, dish_name, food_desc, rating, image_path });
}

module.exports = { getAllFoods, getUserFoods, insertFood };
